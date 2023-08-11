import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  LanguageCode,
  ResolutionString,
  widget,
} from '../../../../assets/charting_library';
// import {UDFCompatibleDatafeed} from "../../../../assets/datafeeds/udf";
import {TradesService} from "../../../core/services/trades.service";
import {SocketClient} from "../../../../socketClient";
import {TerminalComponent} from "../../../pages/components/terminal/terminal.component";

// import {makeApiRequest, parseFullSymbol} from "./helpers";


@Component({
  selector: 'app-chart-new',
  templateUrl: './chart-new.component.html',
  styleUrls: ['./chart-new.component.scss']
})
export class ChartNewComponent implements OnInit, OnDestroy {
  _symbol: ChartingLibraryWidgetOptions['symbol'] = 'BTCUSDT';
  _interval: ChartingLibraryWidgetOptions['interval'] = '1d' as ResolutionString;
  private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
  private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = 'https://saveload.tradingview.com';
  private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
  private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
  private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
  private _containerId: ChartingLibraryWidgetOptions['container'] = 'tv_chart_container';
  private _tvWidget: IChartingLibraryWidget | null = null;
  chartData!: any[];
  aoActiveTradeMarkers = new Map();

  constructor(private tradesService: TradesService,
              private socketClient: SocketClient,
              private oTerminalComponent: TerminalComponent) {
  }

  ngOnInit() {
    this.tradesService.registerChartNewComponent(this);

    const configurationData = {
      supported_resolutions: ['1d'/*, '3d', '1w', '1m', '3m', '5m'*/],
  /*    symbols_types: [
        { name: 'crypto', value: 'crypto'}
      ]*/
    };

    const lastBarsCache = new Map();

    function getLanguageFromURL(): LanguageCode | null {
      const regex = new RegExp('[\\?&]lang=([^&#]*)');
      const results = regex.exec(location.search);

      return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
    }

    async function getAllSymbols() {
      async function getSymbols() {
        try {
          const response = await fetch(`https://startcryptotrade.com/api/trade/getAllSymbols`);
          return response.json();
        } catch (error) {
          throw new Error(`CryptoCompare request error: ${error.status}`);
        }
      }

      let allSymbols = [];
      let data
      await getSymbols().then((oData) => {
        data = oData.symbols;
      });

      for (let i = 0; i < data.length; i++) {
        allSymbols = data.map(sSymbol => {
          return {
            symbol: sSymbol,
            full_name: sSymbol,
            description: sSymbol,
            exchange: 'CryptoTrade',
            type: 'crypto',
          };
        });
      }

      return [...allSymbols]
    }

    const datafeed = {
      onReady: (callback) => {
        setTimeout(() => callback(configurationData));
      },
      searchSymbols: async (
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
      ) => {
        console.log('[searchSymbols]: Method call');
        const symbols = await getAllSymbols();
        const newSymbols = symbols.filter(symbol => {
          return symbol.full_name
            .toLowerCase()
            .indexOf(userInput.toLowerCase()) !== -1;
        });

        onResultReadyCallback(newSymbols);
      },
      resolveSymbol: async (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback,
        extension
      ) => {
        console.log('[resolveSymbol]: Method call', symbolName);
        const symbols = await getAllSymbols();
        const symbolItem = symbols.find(({full_name}) => full_name === symbolName);
        if (!symbolItem) {
          console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
          onResolveErrorCallback('Cannot resolve symbol');
          return;
        }
        // Symbol information object
        const symbolInfo = {
          ticker: symbolItem.full_name,
          name: symbolItem.symbol,
          description: symbolItem.description,
          type: symbolItem.type,
          session: '24x7',
          timezone: 'Etc/UTC',
          minmov: 1,
          pricescale: 100,
          has_intraday: false,
          has_weekly_and_monthly: false,
          supported_resolutions: configurationData.supported_resolutions,
          volume_precision: 2,
          data_status: 'streaming',
        };
        console.log('[resolveSymbol]: Symbol resolved', symbolName);
        onSymbolResolvedCallback(symbolInfo);
      },
      getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        this.tradesService.onSymbolChanged(symbolInfo.full_name);
        // this.oTerminalComponent.onTimeframeChanged(resolution.toLowerCase())
        try {
          await this.tradesService.getChartData(symbolInfo.full_name, resolution.toLowerCase()).subscribe((data: any[]) => {
            this.chartData = data.map((entry) => {
              return {
                time: entry[0],
                open: parseFloat(entry[1]),
                high: parseFloat(entry[2]),
                low: parseFloat(entry[3]),
                close: parseFloat(entry[4]),
              };
            });

            this.tradesService.setmoCurrencyPaidInteract({
              value: this.chartData[this.chartData.length - 1],
              symbol: symbolInfo.full_name
            })

            lastBarsCache.set(symbolInfo.full_name, {...this.chartData[this.chartData.length - 1]});
            console.log(`[getBars]: returned ${this.chartData.length} bar(s)`);
            onHistoryCallback(this.chartData, {noData: false});
          })
        } catch (error) {
          console.log('[getBars]: Get error', error);
          onErrorCallback(error);
        }
      },
      subscribeBars: (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscriberUID,
        onResetCacheNeededCallback
      ) => {
        this.oTerminalComponent.onCurrencyPairChanged(symbolInfo.full_name);
        this.addSavedTradeMarkers();
        this.tradesService.subscribeToRealtimeData_MultiStream();
        console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
        this.socketClient.on('realtimeData_MultiStream', (data) => {
          if (data.s === this.oTerminalComponent.selectedSymbol) {
            const chartCandle = {
              time: data.t,
              open: Number(data.o),
              high: Number(data.h),
              low: Number(data.l),
              close: Number(data.c),
            };
            this.tradesService.setmoCurrencyPaidInteract({
              value: chartCandle,
              symbol: this.oTerminalComponent.selectedSymbol
            })
            onRealtimeCallback(chartCandle);
          }
        })
      },
      unsubscribeBars: (subscriberUID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
        // unsubscribeFromStream(subscriberUID);
      },
    };


    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this.oTerminalComponent.selectedSymbol,
      datafeed: datafeed,
      interval: this._interval,
      container: this._containerId,
      library_path: this._libraryPath,
      locale: getLanguageFromURL() || 'en',
      disabled_features: ["header_compare", "header_saveload", "timeframes_toolbar", "use_localstorage_for_settings"],
      charts_storage_url: this._chartsStorageUrl,
      charts_storage_api_version: this._chartsStorageApiVersion,
      fullscreen: this._fullscreen,
      autosize: this._autosize,
      theme: "Dark"
    };

    const tvWidget = new widget(widgetOptions);
    this._tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      this.addSavedTradeMarkers();

     /* this._tvWidget.chart().onIntervalChanged().subscribe(this, (data) => {
        this._interval = data;
      })*/

      /* tvWidget.subscribe('on_interval_change', (interval) => {
         // Здесь вы получаете новый интервал от TradingView.
         // Можете его использовать для обновления вашего значения _interval или других действий.
         this._interval = interval as ResolutionString;
       });*/
      /*tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () => tvWidget.showNoticeDialog({
          title: 'Notification',
          body: 'TradingView Charting Library API works correctly',
          callback: () => {
            console.log('Noticed!');
          },
        }));
        button.innerHTML = 'Check API';
      });*/
    });
  }

/*  clearTradeMarkers() {
    this._tvWidget.chart().removeAllShapes();
    // this.aoActiveTradeMarkers.clear();
  }*/

  addSavedTradeMarkers() {
    this.tradesService.getActiveTrades().subscribe((aActiveTrades) => {
      if (this._tvWidget) {
        if (aActiveTrades && aActiveTrades.length) {
          aActiveTrades.forEach(tradeMarker => {
            if (this.aoActiveTradeMarkers.has(tradeMarker.tradeID)) {
              return;
            } else if (tradeMarker.symbol === this.oTerminalComponent.selectedSymbol) {
              this._tvWidget.chart().createMultipointShape([
                {time: new Date().getSeconds(), price: tradeMarker.price}
              ], {
                shape: 'horizontal_line',
                lock: true,
                zOrder: 'top',
                filled: true,
                overrides: {
                  bold: true,
                  linecolor: tradeMarker.tradeType === 'buy' ? '#00FF00' : '#FF0000',
                }
              });
              this.aoActiveTradeMarkers.set(tradeMarker.tradeID, tradeMarker._id);
            }
          });
        }
      }
    });
  }

  ngOnDestroy() {
    if (this._tvWidget !== null) {
      this._tvWidget.remove();
      this._tvWidget = null;
    }
  }
}
