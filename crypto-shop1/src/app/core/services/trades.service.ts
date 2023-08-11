import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, take} from 'rxjs';
import {ChartComponent} from "../../terminal-core/components/chart/chart.component";
import {SocketClient} from "../../../socketClient";
import {sendEmailVerification} from "@angular/fire/auth";
import {ChartNewComponent} from "../../terminal-core/components/chart-new/chart-new.component";

export interface Trade {
  takeProfit?: string
  stopLoss?: string
  bDemoAccount?: boolean
  bisInAction?: boolean
  leverage?: number
  tradeID?: string
  id?: string | number;
  symbol: string;
  tradeType: string;
  amount: number;
  price?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TradesService {
  private trades: Trade[] = [];
  private currentPriceSource = new BehaviorSubject<number>(0);
  // activeTrades: Trade[] = [];
  oObservable_aActiveTrades = new BehaviorSubject<any>([]);
  oObservable_asInteractableSymbols = new BehaviorSubject<any>([]);
  oObservable_aHistory = new BehaviorSubject<any>([]);
  private chartComponent: ChartComponent | null = null;
  private chartNewComponent: ChartNewComponent | null = null;
  bSubscribedToRealTimeData: boolean = false;
  bSubscribedToRealTimePriceActiveTrades: boolean = false;
  public aActiveTradesPrices = [];
  public moCurrencyPairsInteract = new Map();

  public bIsInTradeAction: boolean = false;

  currentPrice$ = this.currentPriceSource.asObservable();

  currentPrice: number;

  private chartDataSource = new BehaviorSubject<any[]>([]);
  chartData$ = this.chartDataSource.asObservable();

  // private socketClient: SocketClient;

  constructor(private oHttpClient: HttpClient, private socketClient: SocketClient) {
    // this.socketClient = new SocketClient();

    let oUser: any = localStorage.getItem('currentUser');
    try {
      oUser = JSON.parse(oUser);
    } catch (e) {
      console.error(e)
    }
    if (oUser) {
      this.initializeSocketEvents();

      let sUserID = oUser.id;
      this.socketClient.emit('updateDeals', {sID_User: sUserID})
      this.socketClient.emit('updateClosedDeals', {sID_User: sUserID})
    }

    /*// Подпишитесь на событие 'realtimeData', чтобы получать обновления графика в реальном времени
    this.socketClient.on('realtimeData', (data) => {
      // Проверьте наличие необходимых полей в данных
      if (data && data.t && data.o && data.h && data.l && data.c) {
        if (this.chartComponent) {
          let nAmountOfSymbols: number = (data && data.c && String(data.c).split('.')[1]
            && String(data.c).split('.')[1].length >= 2)
            ? String(data.c).split('.')[1].length : 2
          this.chartComponent.updateChartDataRealtime(data, nAmountOfSymbols);
          this.chartComponent.updateChartIndicators();
        }
      } else {
        console.error('Invalid data received:', data);
      }
    });*/
  }

  setmoCurrencyPaidInteract = (oPair) => {
    this.moCurrencyPairsInteract.set(oPair.symbol, oPair.value)
  }

  getoActualInfo_Pair = (sPair) => {
    return this.moCurrencyPairsInteract.get(sPair)
  }

  onSymbolChanged(symbol, realtimeTimeframe?) {
    let aoActiveTrades = this.oObservable_aActiveTrades.value
    console.log('aoActiveTrades', aoActiveTrades)
    let asActiveTrades_Symbols = aoActiveTrades.map((oActiveTrade) => {
      return oActiveTrade.symbol;
    })
    if (!asActiveTrades_Symbols.includes(symbol)) {
      asActiveTrades_Symbols.push(symbol)
      this.setasIntractableSymbols(asActiveTrades_Symbols);
    }
    // this.chartComponent.changeSymbol(symbol);
  }

  private initializeSocketEvents(): void {
    /*this.socketClient.on('chartData', (data) => {
      // Обновите данные графика с помощью полученных данных
      this.chartDataSource.next(data);
    });*/

    this.getActiveTrades().subscribe((aActiveTrades) => {
      let asActiveTrades_Symbols = aActiveTrades.map((oActiveTrade) => {
        return oActiveTrade.symbol
      })

      /*if (this.chartComponent && this.chartComponent.symbol) {
        asActiveTrades_Symbols.push(this.chartComponent.symbol);
      }*/
      if (this.chartNewComponent && this.chartNewComponent._symbol) {
        asActiveTrades_Symbols.push(this.chartNewComponent._symbol);
      }

      function unique(arr) {
        let result = [];

        for (let str of arr) {
          if (!result.includes(str)) {
            result.push(str);
          }
        }

        return result;
      }

      if (asActiveTrades_Symbols && unique(asActiveTrades_Symbols).length) {
        this.setasIntractableSymbols(unique(asActiveTrades_Symbols));
      }
      this.subscribeToRealtimeData_MultiStream()
    })
    // this.subscribeToRealtimeData_MultiStream()

    /*this.socketClient.emit('getActiveTrades', () => {

    })*/

    this.socketClient.on('closedTradesListChanged', (aoClosedTrades) => {
      console.log('[closedTradesListChanged], aoClosedTrades: ', aoClosedTrades)
      this.oObservable_aHistory.next(aoClosedTrades);
    })

    this.socketClient.on('activeTradesListChanged', (aoActiveTrades) => {
      // console.log('[activeTradesListChanged], aoActiveTrades: ', aoActiveTrades)
      this.oObservable_aActiveTrades.next(aoActiveTrades);
    })

    this.socketClient.on('addDeal_Success', (oTrade) => {
      console.log('[addDeal_Success]', oTrade)
      this.bIsInTradeAction = false;
    })

    this.socketClient.on('addDeal_Failed', (error) => {
      console.log('[addDeal_Failed]')
      this.bIsInTradeAction = false;
    })

    this.socketClient.on('closeDeal_Success', (oTrade) => {
      console.log('[closeDeal_Success]', oTrade)
      this.bIsInTradeAction = false;
    })

    this.socketClient.on('closeDeal_Failed', (error) => {
      console.log('[closeDeal_Failed]')
      this.bIsInTradeAction = false;
    })

    this.socketClient.on('balanceChanged', (sBalance) => {
      console.log('[balanceChanged]')
    })

    /*this.socketClient.on('realtimeData_MultiStream', (data) => {
      if (this.chartComponent) {
        this.moCurrencyPairsInteract.set(data.s, data);
        if (this.chartComponent.symbol === data.s) {
          if (data && data.t && data.o && data.h && data.l && data.c) {
            if (this.chartComponent) {
              let nAmountOfSymbols: number = (data && data.c && String(data.c).split('.')[1]
                && String(data.c).split('.')[1].length >= 2)
                ? String(data.c).split('.')[1].length : 2
              this.chartComponent.updateChartDataRealtime(data, nAmountOfSymbols);
              this.chartComponent.updateChartIndicators();
            }
          } else {
            console.error('Invalid data received:', data);
          }
        }
      }


      // Проверьте наличие необходимых полей в данных
      /!*if (data && data.t && data.o && data.h && data.l && data.c) {
        if (this.chartComponent) {
          let nAmountOfSymbols: number = (data && data.c && String(data.c).split('.')[1]
            && String(data.c).split('.')[1].length >= 2)
            ? String(data.c).split('.')[1].length : 2
          this.chartComponent.updateChartDataRealtime(data, nAmountOfSymbols);
          this.chartComponent.updateChartIndicators();
        }
      } else {
        console.error('Invalid data received:', data);
      }*!/
    });*/

    this.socketClient.on('connect', () => {
      console.log('Соединение с сервером установлено');
    });

    this.socketClient.on('disconnect', () => {
      console.log('Соединение с сервером разорвано');
    });
  }

  getChartData(symbol: string, interval: string)/*: Observable<any>*/ {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`;
    return this.oHttpClient.get(url);
  }


  setCurrentChartPrice(price: number): void {
    this.currentPriceSource.next(price);
  }

  /*updateCurrentPrice(symbol: string, timeFrame: string): void {
    this.getRealtimeData(symbol, timeFrame).pipe(take(1)).subscribe(data => {
      const price = Number(data.k.c); // Извлекаем цену закрытия из объекта k
      console.log('price', price)
      this.currentPriceSource.next(price);
    });
  }*/

  /*getRealtimeData(symbol: string, timeFrame: string): Observable<any> {
    const url = `https://startcryptotrade.com/api/realtime?symbol=${symbol}&timeframe=${timeFrame}`;
    return this.oHttpClient.get(url).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }*/

  subscribeToRealtimeData(symbol: string, timeFrame: string): void {
    // Отправьте запрос на обновление данных в реальном времени
    this.socketClient.emit('requestData', {symbol, interval: timeFrame});
  }

  subscribeToRealtimeData_MultiStream(): void {
    let oUser: any = localStorage.getItem('currentUser');
    try {
      oUser = JSON.parse(oUser);
    } catch (e) {
      console.error(e)
    }
    if (oUser) {
      const sID_User = oUser.id;

      this.getasInteractableSymbols().subscribe((asSymbols) => {
        if (asSymbols && asSymbols.length) {
          this.socketClient.emit("requestMultiStream", {symbols: asSymbols, intervals: ['1d'], userID: sID_User});
        }
      })
    }
  }

  getCurrentPriceBySymbol = (sSymbol: string) => {
    let nPrice_Return = 0;
    if (this.aActiveTradesPrices && this.aActiveTradesPrices.length) {
      this.aActiveTradesPrices.forEach((oActiveTradesPrices) => {
        if (oActiveTradesPrices[sSymbol]) {
          nPrice_Return = Number(oActiveTradesPrices[sSymbol][4]) !== 0
            ? Number(oActiveTradesPrices[sSymbol][4])
            : Number(oActiveTradesPrices[sSymbol][3])
        }
      })
    }
    return nPrice_Return
  }

  getCurrentPrice = () => {
    return this.currentPrice;
  }

  isInTradeAction = () => {
    return this.bIsInTradeAction;
  }

  getLastPriceByInteractPair = (sPair: string) => {
    return this.moCurrencyPairsInteract.get(sPair);
  }

  getLastPriceByPair = async (sPair: string) => {
    if (this.moCurrencyPairsInteract.get(sPair)) {
      return this.moCurrencyPairsInteract.get(sPair);
    }else {
      return this.oHttpClient.get(`https://startcryptotrade.com/api/realtime?symbol=${sPair}&timeframe=${this.chartNewComponent._interval}`)
    }
  }
  /*  getLastPriceByPair = async (sPair: string) => {
    if (this.moCurrencyPairsInteract.get(sPair)) {
      return this.moCurrencyPairsInteract.get(sPair);
    }else {
      return this.oHttpClient.get(`https://startcryptotrade.com/api/realtime?symbol=${sPair}&timeframe=${this.chartComponent.timeframe}`)
    }
  }*/

  activeTradesInterval;

  /*subscribeToRealtimePriceActiveTrades(): void {
    this.getActiveTrades().subscribe((aoActiveTrades) => {
      if (this.activeTradesInterval) {
        clearInterval(this.activeTradesInterval);
      }
      let aSymbolsOfActiveTrades = aoActiveTrades.map((oActiveTrade) => {
        return oActiveTrade.symbol
      }).filter((sActiveTrade) => {
        return sActiveTrade !== this.chartComponent.symbol;
      })

      let aSymbolsOfActiveTrades_Uniq = aSymbolsOfActiveTrades.filter(function (item, pos) {
        return aSymbolsOfActiveTrades.indexOf(item) == pos;
      })

      if (aSymbolsOfActiveTrades_Uniq && aSymbolsOfActiveTrades_Uniq.length) {
        this.activeTradesInterval = setInterval(() => {
          this.oHttpClient.post('https://startcryptotrade.com/api/realtime/requestActiveTradesPrice',
            {
              symbols: aSymbolsOfActiveTrades_Uniq
            }).subscribe((data: any) => {
            if (data && data.symbolsData) {
              this.aActiveTradesPrices = data.symbolsData
            }
          })
        }, 2000)
      }
    })
  }*/

  /*subscribeToRealtimeData(): void {
    if (!this.bSubscribedToRealTimeData) {
      this.bSubscribedToRealTimeData = true;
      setInterval(() => {
        this.oHttpClient.post('https://startcryptotrade.com/api/realtime/requestData',
          {
            symbol: this.chartComponent.symbol,
            interval: this.chartComponent.timeframe
          }).subscribe((data: any) => {
          if (data && data.historicalData) {
            const formattedHistoricalData = data.historicalData.map((entry: any[]) => {
              return {
                time: entry[0] / 1000,
                open: parseFloat(entry[1]),
                high: parseFloat(entry[2]),
                low: parseFloat(entry[3]),
                close: parseFloat(entry[4]) !== 0
                  ? parseFloat(entry[4])
                  : parseFloat(entry[3]),
              };
            });

            this.chartDataSource.next(formattedHistoricalData);

            if (this.chartComponent) {
              let nAmountOfSymbols: number = (formattedHistoricalData
                && formattedHistoricalData.length
                && formattedHistoricalData[formattedHistoricalData.length - 1].close
                && String(formattedHistoricalData[formattedHistoricalData.length - 1].close).split('.')[1]
                && String(formattedHistoricalData[formattedHistoricalData.length - 1].close).split('.')[1].length >= 2)
                ? String(formattedHistoricalData[formattedHistoricalData.length - 1].close).split('.')[1].length : 2
              this.chartComponent.updateChartDataRealtime(formattedHistoricalData, nAmountOfSymbols);  // Передайте весь массив для отображения исторических данных
              this.currentPrice = formattedHistoricalData[formattedHistoricalData.length - 1].close;
              this.chartComponent.updateChartIndicators();
            }
          }
        })
      }, 2000)
    }
  }*/

  getAllSymbols() {
    return this.oHttpClient.get(`https://startcryptotrade.com/api/trade/getAllSymbols`);
  }

  registerChartComponent(chartComponent: ChartComponent) {
    this.chartComponent = chartComponent;
  }

  registerChartNewComponent(chartNewComponent: ChartNewComponent) {
    this.chartNewComponent = chartNewComponent;
  }

  getHistory(): Observable<any> {
    return this.oObservable_aHistory;
  }

  /*updateHistory(sID_User: string, bDemoAccount: boolean) {
    this.oHttpClient.post(`https://startcryptotrade.com/api/auth/users/${sID_User}/closedDeals`, {bDemoAccount})
      .subscribe((oRes) => {
        this.oObservable_aHistory.next(oRes);
      })
  }*/

  isAnyActiveTrades() {
    return !!this.oObservable_aActiveTrades.value.length;
  }

 /* updateActiveTrades(sID_User: string) {
    this.oHttpClient.get(`https://startcryptotrade.com/api/auth/users/${sID_User}/activeDeals`).subscribe((oRes) => {
      this.oObservable_aActiveTrades.next(oRes);
    })
  }*/

  getActiveTrades(): Observable<any> {
    return this.oObservable_aActiveTrades;
  }

  setasIntractableSymbols = (asIntractableSymbols) => {
    this.oObservable_asInteractableSymbols.next(asIntractableSymbols);
  }

  getasInteractableSymbols (): Observable<any> {
    return this.oObservable_asInteractableSymbols;
  }

  addTrade(trade: Trade, sID_User: string, oTerminalComponent) {
    this.bIsInTradeAction = true;

    let oTradeToPrecess = {
      stopLoss: trade.stopLoss,
      takeProfit: trade.takeProfit,
      bDemoAccount: trade.bDemoAccount,
      tradeID: trade.id,
      userID: sID_User, //{ type: Schema.Types.ObjectId, ref: 'User', required: true }
      symbol: trade.symbol, //{ type: String, required: true }
      tradeType: trade.tradeType, //{ type: String, required: true, enum: ['buy', 'sell'] }
      amount: trade.amount, // { type: Number, required: true }
      price: trade.price, //{ type: Number, required: true }
      dealOpened: new Date(), //{ type: Date, default: Date.now }
      leverage: trade.leverage, //{ type: Number, required: false, default: 1 }
      dealStatus: 'active' //{ type: String, default: 'active', enum: ['active', 'closed'] }
    }

    console.log('trade', trade)
    this.socketClient.emit('updateDeals', oTradeToPrecess)


    /*return this.oHttpClient.post('https://startcryptotrade.com/api/trade/deals/openDeal', {
      stopLoss: trade.stopLoss,
      takeProfit: trade.takeProfit,
      bDemoAccount: trade.bDemoAccount,
      tradeID: trade.id,
      userID: sID_User, //{ type: Schema.Types.ObjectId, ref: 'User', required: true }
      symbol: trade.symbol, //{ type: String, required: true }
      tradeType: trade.tradeType, //{ type: String, required: true, enum: ['buy', 'sell'] }
      amount: trade.amount, // { type: Number, required: true }
      price: trade.price, //{ type: Number, required: true }
      dealOpened: new Date(), //{ type: Date, default: Date.now }
      leverage: trade.leverage, //{ type: Number, required: false, default: 1 }
      dealStatus: 'active' //{ type: String, default: 'active', enum: ['active', 'closed'] }
    }).subscribe((oActiveTradeSubmitted) => {
      let aActiveTrades = this.oObservable_aActiveTrades.value;

      let sUserBalance;
      let oUser: any = localStorage.getItem('currentUser');
      try {
        oUser = JSON.parse(oUser);
      } catch (e) {
        console.error(e)
      }
      let sUserID = oUser.id;
      oTerminalComponent.getoUserInfo().subscribe((oRes) => {
        oUser = oRes;
      });

      if (trade.bDemoAccount) {
        sUserBalance = (Number(oUser.sBalance_Demo) - trade.amount).toFixed(2)
        this.onPutDemoBalance(sUserBalance, sUserID).subscribe(() => {
          oTerminalComponent.onUpdateUser()
          aActiveTrades.push(oActiveTradeSubmitted);
          this.oObservable_aActiveTrades.next(aActiveTrades);
          this.bIsInTradeAction = false;
        })
      } else {
        sUserBalance = (Number(oUser.sBalance) - trade.amount).toFixed(2)
        this.onPutBalance(sUserBalance, sUserID).subscribe(() => {
          oTerminalComponent.onUpdateUser()
          aActiveTrades.push(oActiveTradeSubmitted);
          this.oObservable_aActiveTrades.next(aActiveTrades);
          this.bIsInTradeAction = false;
        })
      }
    })*/
  }

  closeTrade(trade: Trade) {
    trade.bisInAction = true;
    this.bIsInTradeAction = true;

    this.socketClient.emit('closeDeal', {
      tradeID: trade.tradeID
    })


    /*return this.oHttpClient.put(`https://startcryptotrade.com/api/trade/deals/closeDeal/${trade.tradeID}`,
      {sDealResultPNL}).subscribe(() => {
      let aActiveTrades = this.oObservable_aActiveTrades.value;
      const nIndex_Trade = aActiveTrades.findIndex((t) => t.id === trade.id);
      if (nIndex_Trade !== -1) {
        let sUserBalance;
        let oUser: any = localStorage.getItem('currentUser');
        try {
          oUser = JSON.parse(oUser);
        } catch (e) {
          console.error(e)
        }
        let sUserID = oUser.id;
        oTerminalComponent.getoUserInfo().subscribe((oRes) => {
          oUser = oRes;
        });

        if (trade.bDemoAccount) {
          sUserBalance = (Number(oUser.sBalance_Demo) + nChangedBalance + trade.amount).toFixed(2)
          this.onPutDemoBalance(sUserBalance, sUserID).subscribe(() => {
            oTerminalComponent.onUpdateUser()
            trade.bisInAction = false;
            aActiveTrades.splice(nIndex_Trade, 1);
            this.oObservable_aActiveTrades.next(aActiveTrades);
            this.bIsInTradeAction = false;
          })
        } else {
          sUserBalance = (Number(oUser.sBalance) + nChangedBalance + trade.amount).toFixed(2)
          this.onPutBalance(sUserBalance, sUserID).subscribe(() => {
            oTerminalComponent.onUpdateUser()
            trade.bisInAction = false;
            aActiveTrades.splice(nIndex_Trade, 1);
            this.oObservable_aActiveTrades.next(aActiveTrades);
            this.bIsInTradeAction = false;
          })
        }
      }
    })*/
  }

  /*onPutBalance(sBalance: string, sID_User: string) {
    return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/user/${sID_User}/balance`, {
      sBalance: sBalance
    });
  }*/

  onPutDemoBalance(sBalance_Demo: string, sID_User: string) {
    /*return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/user/${sID_User}/addBalanceDemo`,
      {sBalance_Demo})*/
    this.socketClient.emit('userUpdate', {
      sID_User: sID_User, sKey_Param: 'balanceDemo', sValue: sBalance_Demo
    })
  }
}
