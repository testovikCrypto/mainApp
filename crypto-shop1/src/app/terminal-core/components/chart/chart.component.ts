import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TradesService} from "../../../core/services/trades.service";
import {catchError, fromEvent, Observable, of, Subject, Subscription, tap} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {createChart, CrosshairMode, IPriceLine, LineStyle, PriceLineOptions} from 'lightweight-charts';
import {TerminalComponent} from "../../../pages/components/terminal/terminal.component";
import {OpenComponent} from "../open/open.component";
import {SocketClient} from "../../../../socketClient";

interface TradeMarker {
  priceLine: IPriceLine;
  options: PriceLineOptions;
}

interface IchimokuData {
  tenkanSen: number[];
  kijunSen: number[];
  senkouSpanA: number[];
  senkouSpanB: number[];
  chikouSpan: number[];
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  @ViewChild('rsiChart', {static: true}) rsiChartRef: ElementRef;

  // private socketClient = new SocketClient();
  // private priceChangeSubscription: Subscription;
  private pair: string;
  private timeFrame: string;


  oObservable_ActualSymbol: Observable<string>;
  private currentSeries: any;

  symbol: string;
  timeframe: string;
  realtimeTimeframe: string;

  private chart: any;
  private chartDataSubscription: Subscription;
  chartData!: any[];
  // tradeMarkers: TradeMarker[] = [];
  candlestickSeries: any;
  candles: any[] = [];

  public aoActiveTradeMarkers;

  private timerSubscription: Subscription;
  // private changeTrigger = new Subject<void>();

  indicators = {
    ema: null,
    sma: null,
    bb: null,
    ichimoku: null
  };

  constructor(private tradesService: TradesService,
              private oTerminalComponent: TerminalComponent,
              private oOpenComponent: OpenComponent,
              private socketClient: SocketClient
  ) {
    this.aoActiveTradeMarkers = new Map();
    this.oTerminalComponent.getCurrencyPair().subscribe((sPair) => {
      this.symbol = sPair;
    });
    this.oTerminalComponent.getTimeFrame().subscribe((sTimeFrame) => {
      this.timeframe = sTimeFrame;
    })
    this.oTerminalComponent.getRealTimeFrame().subscribe((sRealTimeFrame) => {
      this.realtimeTimeframe = sRealTimeFrame;
    })
  }

  ngOnInit(): void {
    /*this.priceChangeSubscription = this.socketClient.getPriceChange$().subscribe(
      (priceChange: number) => {
        // Здесь ваш код для обновления данных графика и перерисовки
      }
    );*/
  }

  ngOnDestroy(): void {
    // this.priceChangeSubscription.unsubscribe();
    this.chartDataSubscription?.unsubscribe();
    this.timerSubscription?.unsubscribe(); // Отписываемся от таймера при уничтожении компонента
  }

  ngAfterViewInit(): void {
    /* this.initChart();
     this.updateChartData();
     this.tradesService.registerChartComponent(this);
     this.tradesService.subscribeToRealtimeData(this.symbol, this.timeframe);*/
    this.initChart();
    this.updateChartData();
    // this.tradesService.subscribeToRealtimeData(this.symbol, this.timeframe);
    /*this.tradesService.getActiveTrades().subscribe((aActiveTrades) => {
      console.log('aActiveTrades', aActiveTrades)
      let asActiveTrades_Symbols = aActiveTrades.map((oActiveTrade) => {
        return oActiveTrade.symbol
      })

      asActiveTrades_Symbols.push(this.symbol);

      function unique(arr) {
        let result = [];

        for (let str of arr) {
          if (!result.includes(str)) {
            result.push(str);
          }
        }

        return result;
      }

      this.tradesService.subscribeToRealtimeData_MultiStream(unique(asActiveTrades_Symbols), ['15m'])
    })*/
    this.tradesService.registerChartComponent(this);

    // Подписываемся на обновления данных графика
    this.chartDataSubscription.add(
      this.tradesService.chartData$.subscribe(chartData => {
        console.log(33333, chartData)
        // Если данные графика существуют, обновляем текущую цену
        if (chartData.length > 0) {
          const latestPrice = chartData[chartData.length - 1].close;
          this.tradesService.setCurrentChartPrice(latestPrice);
        }
      })
    );

    /*this.changeTrigger.pipe(debounceTime(500)).subscribe(() => {
      this.tradesService.updateCurrentPrice(this.symbol, this.timeframe);
    });*/
    // this.tradesService.subscribeToRealtimePriceActiveTrades();
    let oUser: any = localStorage.getItem('currentUser');
    try {
      oUser = JSON.parse(oUser);
    } catch (e) {
      console.error(e)
    }
    let sUserID = oUser.id;
    // this.tradesService.updateActiveTrades(sUserID);
    this.addSavedTradeMarkers();
  }

  convertTimeframeToRealtime(timeframe: string): string {
    switch (timeframe) {
      case '1m':
        return '1m';
      case '5m':
        return '1m';
      case '15m':
        return '1m';
      case '30m':
        return '1m';
      case '1h':
        return '1m';
      case '1d':
        return '1h';
      case '1w':
        return '1h';
      case '1M':
        return '1d';
      default:
        return '1m';
    }
  }

  calculateEMA(data: { close: number }[], period: number): number[] {
    const alpha = 2 / (period + 1);
    let prevEMA = data[0].close;
    const emaData: number[] = [prevEMA];

    for (let i = 1; i < data.length; i++) {
      const currentEMA = alpha * (data[i].close - prevEMA) + prevEMA;
      emaData.push(currentEMA);
      prevEMA = currentEMA;
    }

    return emaData;
  }

  calculateBollingerBands(data: number[], period: number, stdDev: number = 2): { upper: number[]; middle: number[]; lower: number[] } {
    const sma = this.calculateSMA(data, period);

    const bands = {
      upper: [],
      middle: sma,
      lower: [],
    };

    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        bands.upper.push(null);
        bands.lower.push(null);
      } else {
        const slice = data.slice(i - period + 1, i + 1);
        const std = Math.sqrt(slice.map((x) => Math.pow(x - sma[i], 2)).reduce((a, b) => a + b) / period);

        bands.upper.push(sma[i] + stdDev * std);
        bands.lower.push(sma[i] - stdDev * std);
      }
    }

    return bands;
  }

  calculateIchimoku(
    data,
    tenkanPeriod: number = 9,
    kijunPeriod: number = 26,
    senkouSpanBPeriod: number = 52
  ): IchimokuData {
    const tenkanSen: number[] = [];
    const kijunSen: number[] = [];
    const senkouSpanA: number[] = [];
    const senkouSpanB: number[] = [];
    const chikouSpan: number[] = [];

    for (let i = 0; i < data.length; i++) {
      const tenkanHighMax = i < tenkanPeriod - 1 ? null : Math.max(...data.slice(i - tenkanPeriod + 1, i + 1).map(candle => candle.high));
      const tenkanLowMin = i < tenkanPeriod - 1 ? null : Math.min(...data.slice(i - tenkanPeriod + 1, i + 1).map(candle => candle.low));
      tenkanSen.push(tenkanHighMax !== null ? (tenkanHighMax + tenkanLowMin) / 2 : null);

      const kijunHighMax = i < kijunPeriod - 1 ? null : Math.max(...data.slice(i - kijunPeriod + 1, i + 1).map(candle => candle.high));
      const kijunLowMin = i < kijunPeriod - 1 ? null : Math.min(...data.slice(i - kijunPeriod + 1, i + 1).map(candle => candle.low));
      kijunSen.push(kijunHighMax !== null ? (kijunHighMax + kijunLowMin) / 2 : null);

      if (i < kijunPeriod - 1) {
        senkouSpanA.push(null);
      } else {
        senkouSpanA.push((tenkanSen[i] + kijunSen[i]) / 2);
      }

      const senkouSpanBHighMax = i < senkouSpanBPeriod - 1 ? null : Math.max(...data.slice(i - senkouSpanBPeriod + 1, i + 1).map(candle => candle.high));
      const senkouSpanBLowMin = i < senkouSpanBPeriod - 1 ? null : Math.min(...data.slice(i - senkouSpanBPeriod + 1, i + 1).map(candle => candle.low));
      senkouSpanB.push(senkouSpanBHighMax !== null ? (senkouSpanBHighMax + senkouSpanBLowMin) / 2 : null);

      chikouSpan.push(data[i].close);
    }

    return {
      tenkanSen,
      kijunSen,
      senkouSpanA,
      senkouSpanB,
      chikouSpan,
    };
  }

  calculateSMA(data: number[], period: number): number[] {
    const sma = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        sma.push(null);
      } else {
        const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b);
        sma.push(sum / period);
      }
    }
    return sma;
  }

  initChart(): void {
    this.chart = createChart(this.chartContainer.nativeElement, {
      /*watermark: {
        visible: true,
        color: '#000',
        text: 'Не оплачено'
      },*/
      /*width: this.chartContainer.nativeElement.clientWidth,
      height: this.chartContainer.nativeElement.clientHeight,*/
      autoSize: true,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      layout: {
        background: {
          color: '#171819'
        },
        textColor: 'rgba(255, 255, 255, 0.9)',
        fontSize: 10
      },
      grid: {
        vertLines: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        horzLines: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      rightPriceScale: {
        autoScale: true,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        visible: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        borderVisible: true,
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255 0.8)',
      }
    });

    this.candlestickSeries = this.chart.addCandlestickSeries();

    this.chart.applyOptions({
      localization: {
        locale: 'ru',
        timeFormatter: (time) => {
          const date = new Date(time * 1000);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString().split(':')[0] + ':' + date.toLocaleTimeString().split(':')[1]}`;
        },
      },
    });

    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.chart.resize(this.chartContainer.nativeElement.clientWidth, this.chartContainer.nativeElement.clientHeight);
      });
  }

  removeAllIndicators(): void {
    for (const indicator in this.indicators) {
      if (this.indicators[indicator]) {
        if (this.indicators[indicator].areaSeries) {
          this.chart.removeSeries(this.indicators[indicator].areaSeries);
        }
        for (const lineSeries in this.indicators[indicator]) {
          if (lineSeries !== 'areaSeries' && this.indicators[indicator][lineSeries]) {
            this.chart.removeSeries(this.indicators[indicator][lineSeries]);
            this.indicators[indicator][lineSeries] = null;
          }
        }
        this.indicators[indicator] = null;
      }
    }
  }

  updateChartIndicators(): void {
    this.removeAllIndicators();

    let sActiveIndicator: any = localStorage.getItem('sActiveIndicator');
    if (sActiveIndicator) {
      if (sActiveIndicator === 'SMA') {
        this.addSMA();
      } else if (sActiveIndicator === 'EMA') {
        this.addEMA(21)
      } else if (sActiveIndicator === 'BB') {
        this.addBollingerBands(20, 2);
      } else if (sActiveIndicator === 'IC') {
        this.addIchimoku(9, 26, 52)
      }
    }
  }

  addSMA(): void {
    const smaPeriod1 = 5;
    const smaPeriod2 = 10;

    let mapValueTimeCandles = this.candles.map((value, index, array) => {
      return {value: value.close, time: value.time}
    });

    const smaValues1 = this.calculateSMA(mapValueTimeCandles.map(d => d.value), smaPeriod1);
    const smaValues2 = this.calculateSMA(mapValueTimeCandles.map(d => d.value), smaPeriod2);

    const areaSeries = this.chart.addAreaSeries({
      topColor: 'rgba(76, 175, 80, 0.56)',
      bottomColor: 'rgba(76, 175, 80, 0.04)',
      lineColor: 'rgba(76, 175, 80, 1)',
      lineWidth: 2,
    });

    areaSeries.setData(mapValueTimeCandles);

    const smaLine1 = this.chart.addLineSeries({
      color: 'rgba(4, 111, 232, 1)',
      lineWidth: 2,
    });

    const smaLine2 = this.chart.addLineSeries({
      color: 'rgba(255, 99, 97, 1)',
      lineWidth: 2,
    });

    smaLine1.setData(
      mapValueTimeCandles
        .map((d, i) => ({time: d.time, value: smaValues1[i]}))
        .filter((d) => d.value !== null)
    );

    smaLine2.setData(
      mapValueTimeCandles
        .map((d, i) => ({time: d.time, value: smaValues2[i]}))
        .filter((d) => d.value !== null)
    );

    this.indicators.sma = {
      areaSeries,
      smaLine1,
      smaLine2,
    };
  }

  addEMA(period: number): void {
    const emaData = this.calculateEMA(this.candles, period);
    console.log('emaData', emaData)

    if (!this.indicators.ema) {
      this.indicators.ema = {
        areaSeries: null,
      };
    }

    if (this.indicators.ema.areaSeries) {
      this.indicators.ema.areaSeries.setData(emaData.map((value, index) => ({...this.candles[index], value})));
    } else {
      const emaSeries = this.chart.addLineSeries({
        color: 'rgba(255, 255, 0, 0.8)',
        lineWidth: 2,
      });

      emaSeries.setData(emaData.map((value, index) => ({...this.candles[index], value})));
      this.indicators.ema.areaSeries = emaSeries;
    }
  }

  addBollingerBands(period: number, stdDev: number): void {
    const bbData = this.calculateBollingerBands(this.candles.map(p => p.close), period, stdDev);

    if (this.indicators.bb) {
      // Если индикатор BB уже создан, обновляем его данные
      this.indicators.bb.upper.setData(
        bbData.upper
          .map((value, index) => {
            if (value === null) {
              return null;
            }
            return {time: this.candles[index].time, value};
          })
          .filter(item => item !== null)
      );

      this.indicators.bb.middle.setData(
        bbData.middle
          .map((value, index) => {
            if (value === null) {
              return null;
            }
            return {time: this.candles[index].time, value};
          })
          .filter(item => item !== null)
      );

      this.indicators.bb.lower.setData(
        bbData.lower
          .map((value, index) => {
            if (value === null) {
              return null;
            }
            return {time: this.candles[index].time, value};
          })
          .filter(item => item !== null)
      );
    } else {
      // В противном случае создаем новый индикатор BB
      const upperSeries = this.chart.addLineSeries({color: 'green', lineWidth: 1});
      const middleSeries = this.chart.addLineSeries({color: 'blue', lineWidth: 1});
      const lowerSeries = this.chart.addLineSeries({color: 'red', lineWidth: 1});

      upperSeries.setData(
        bbData.upper
          .map((value, index) => {
            if (value === null) {
              return null;
            }
            return {time: this.candles[index].time, value};
          })
          .filter(item => item !== null)
      );

      middleSeries.setData(
        bbData.middle
          .map((value, index) => {
            if (value === null) {
              return null;
            }
            return {time: this.candles[index].time, value};
          })
          .filter(item => item !== null)
      );

      lowerSeries.setData(
        bbData.lower
          .map((value, index) => {
            if (value === null) {
              return null;
            }
            return {time: this.candles[index].time, value};
          })
          .filter(item => item !== null)
      );

      this.indicators.bb = {
        upper: upperSeries,
        middle: middleSeries,
        lower: lowerSeries,
      };
    }
  }

  addIchimoku(tenkanPeriod: number, kijunPeriod: number, senkouSpanBPeriod: number): void {
    const ichimokuData = this.calculateIchimoku(this.candles, tenkanPeriod, kijunPeriod, senkouSpanBPeriod);

    if (!this.indicators.ichimoku) {
      this.indicators.ichimoku = {
        tenkanSenSeries: null,
        kijunSenSeries: null,
        chikouSpanSeries: null,
        senkouSpanASeries: null,
        senkouSpanBSeries: null,
        ichimokuCloudSeries: null,
      };
    }

    // Создаем новые series, если они не существуют, и обновляем их данные
    const seriesKeys = [
      'tenkanSenSeries', 'kijunSenSeries', 'chikouSpanSeries',
      'senkouSpanASeries', 'senkouSpanBSeries', 'ichimokuCloudSeries'
    ];

    for (const key of seriesKeys) {
      if (!this.indicators.ichimoku[key]) {
        if (key === 'ichimokuCloudSeries') {
          this.indicators.ichimoku[key] = this.chart.addAreaSeries({
            topColor: 'rgba(38, 166, 154, 0.5)',
            bottomColor: 'rgba(232, 62, 62, 0.5)',
            lineWidth: 1,
            lineColor: 'rgba(0, 0, 0, 0)',
          });
        } else {
          this.indicators.ichimoku[key] = this.chart.addLineSeries({
            color: key === 'tenkanSenSeries' ? 'rgba(255, 0, 0, 0.8)' :
              key === 'kijunSenSeries' ? 'rgba(0, 0, 255, 0.8)' :
                key === 'chikouSpanSeries' ? 'rgba(128, 128, 128, 0.8)' : 'rgba(0, 128, 0, 0.8)',
            lineWidth: 2,
          });
        }
      }
    }

    // Задаем данные для всех series
    this.indicators.ichimoku.tenkanSenSeries.setData(ichimokuData.tenkanSen.map((value, index) => {
      return {time: this.candles[index].time, value};
    }).filter(point => point.value !== null));

    this.indicators.ichimoku.kijunSenSeries.setData(ichimokuData.kijunSen.map((value, index) => {
      return {time: this.candles[index].time, value};
    }).filter(point => point.value !== null));

    this.indicators.ichimoku.chikouSpanSeries.setData(ichimokuData.chikouSpan.map((value, index) => {
      return {time: this.candles[index].time, value};
    }).filter(point => point.value !== null));

    this.indicators.ichimoku.senkouSpanASeries.setData(ichimokuData.senkouSpanA.map((value, index) => {
      return {time: this.candles[index].time, value};
    }).filter(point => point.value !== null));

    this.indicators.ichimoku.senkouSpanBSeries.setData(ichimokuData.senkouSpanB.map((value, index) => {
      return {time: this.candles[index].time, value};
    }).filter(point => point.value !== null));

    const cloudData = ichimokuData.senkouSpanA.map((spanA, index) => {
      return {
        time: this.candles[index].time,
        topValue: Math.max(spanA, ichimokuData.senkouSpanB[index]),
        bottomValue: Math.min(spanA, ichimokuData.senkouSpanB[index]),
      };
    }).filter(point => point.topValue !== null && point.bottomValue !== null);

    this.indicators.ichimoku.ichimokuCloudSeries.setData(cloudData);
  }

  updateChartDataRealtime(candle, nAmountOfSymbols: number): void {
    const chartCandle = {
      time: candle.t / 1000,
      open: Number(candle.o),
      high: Number(candle.h),
      low: Number(candle.l),
      close: Number(candle.c),
    };

    // Проверьте, существует ли уже свеча с этим временем
    const existingCandle = this.candles.find(c => c.time === chartCandle.time);

    if (existingCandle) {
      // Если свеча уже существует, обновите её
      Object.assign(existingCandle, chartCandle);
      this.candlestickSeries.update(chartCandle);
    } else {
      // Если свечи нет, добавьте её
      this.candles.push(chartCandle);
      this.candlestickSeries.update(chartCandle);
    }

    if (this.candlestickSeries) {
      this.candlestickSeries.applyOptions({
        priceFormat: {
          type: 'price',
          precision: nAmountOfSymbols,
          minMove: 1 / Math.pow(10, nAmountOfSymbols),
        },
      })
    }
  }


  updateChartData(): void {
    this.chartDataSubscription?.unsubscribe();
    this.chartDataSubscription = this.fetchChartData().subscribe(
      () => {
        this.candles = this.chartData;

        // Удаление предыдущих данных графика
        if (this.currentSeries) {
          this.chart.removeSeries(this.currentSeries);
        }

        this.candlestickSeries = this.chart.addCandlestickSeries();
        this.candlestickSeries.setData(this.chartData);

        this.addSavedTradeMarkers();

        // Обновление текущей серии графика
        this.currentSeries = this.candlestickSeries;
      },
      (error) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }

  addSavedTradeMarkers() {
    this.tradesService.getActiveTrades().subscribe((aActiveTrades) => {
      this.clearTradeMarkers();
      if (aActiveTrades && aActiveTrades.length) {
        aActiveTrades.forEach(tradeMarker => {
          if (this.aoActiveTradeMarkers.has(tradeMarker.tradeID)) {
            return;
          } else if (tradeMarker.symbol === this.oTerminalComponent.selectedSymbol) {
            const lineOptions = {
              price: tradeMarker.price,
              color: tradeMarker.tradeType === 'buy' ? '#00FF00' : '#FF0000',
              lineWidth: 2,
              title: tradeMarker.tradeType === 'buy' ? 'Buy' : 'Sell',
              lineStyle: LineStyle.Solid,
              axisLabelTextColor: '#FFFFFF',
              axisLabelColor: tradeMarker.tradeType === 'buy' ? '#00FF00' : '#FF0000',
              lineVisible: true,
              axisLabelVisible: true,
            };
            tradeMarker.priceLine = this.candlestickSeries.createPriceLine(lineOptions);
            this.aoActiveTradeMarkers.set(tradeMarker.tradeID, tradeMarker.priceLine);
          }
        });
      }
    });
  }

  clearTradeMarkers() {
    this.aoActiveTradeMarkers.forEach((priceLine) => {
      this.candlestickSeries.removePriceLine(priceLine);
    });

    // После удаления всех линий, очищаем Map
    this.aoActiveTradeMarkers.clear();
  }

  changeSymbol(newSymbol: string): void {
    this.symbol = newSymbol;
    this.updateChartData();
  }

  fetchChartData(): Observable<any> {
    return this.tradesService.getChartData(this.symbol, this.timeframe)/*.pipe(
      tap((data) => {
        this.chartData = data.map(item => ({
          time: item['time'] / 1000,
          open: item['open'],
          high: item['high'],
          low: item['low'],
          close: item['close'],
        }));

        this.tradesService.setmoCurrencyPaidInteract(
          {
            value: this.chartData[this.chartData.length - 1],
            symbol: this.symbol
          })
      }),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );*/
  }

  onWindowResize(): void {
    if (this.chart) {
      this.chart.resize(
        this.chartContainer.nativeElement.clientWidth,
        this.chartContainer.nativeElement.clientHeight
      );
    }
  }
}

