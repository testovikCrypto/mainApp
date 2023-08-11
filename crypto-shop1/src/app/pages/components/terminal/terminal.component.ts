import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {UserModel} from "../../../../types";
import {Trade, TradesService} from "../../../core/services/trades.service";
// import {SocketClient} from "../../../socketClient";
import {ChartComponent} from "../../../terminal-core/components/chart/chart.component";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {ModalService} from "../../../core/services/modal.service";
import {SocketClient} from "../../../../socketClient";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent {
  sObservable_SelectedSymbol = new BehaviorSubject<string>('BTCUSDT');
  sObservable_SelectedTimeFrame = new BehaviorSubject<string>('1d');
  sObservable_RealTimeFrame = new BehaviorSubject<string>('1h');
  /*oObservable_UserInfo = new BehaviorSubject<UserModel>({
    id: '',
    sBalance: '',
    sEmail: '',
    sName: '',
    sNumber: '',
    sSurname: '',
    bVerificationDocumentsSubmitted: false,
    sVerificationConfirmed: 'false',
    oVerificationDocuments: [],
    _id: ''
  });*/

  public nLeverage: number = 1;

  bAvailableStopLoss: boolean = false;
  bAvailableTakeProfit: boolean = false;
  nTakeProfit: number = 0;
  nStopLoss: number = 0;

  public sSearchPair: string;
  public sCurrentCurrencyPair: string;
  public asSymbol: any;

  sActiveMenu: string;

  selectedSymbol = 'BTCUSDT';
  selectedTimeframe = '1d';
  realtimeTimeframe = '1h';
  sTradeActionBar: string = 'buy';
  /*nPreviousPrice: number = 0;
  bPriceGoesUp: boolean = true;*/

  // private socketClient: SocketClient

  nAmountToPrecess = 0;
  // socketClient: SocketClient;
  private chartComponent: ChartComponent | null = null;

  public oUserInfo: UserModel = {
    id: '',
    sBalance: '',
    sEmail: '',
    sName: '',
    sNumber: '',
    sSurname: '',
    bVerificationDocumentsSubmitted: false,
    sVerificationConfirmed: 'false',
    oVerificationDocuments: [],
    _id: ''
  };

  constructor(private oAuthService: AuthService,
              private oTradesService: TradesService,
              private oRouter: Router,
              private modalService: ModalService
  ) {
    this.sActiveMenu = 'chart';
    /*this.oTradesService.getAllSymbols().subscribe((oRes: any) => {
      if (oRes && oRes.symbols && oRes.symbols.length) {
        this.asSymbol = oRes.symbols;
      }
    })*/
  }

  public sCurrentUserEmail: string = '';

  ngAfterViewInit() {
    console.log('89.terminal.component.ts [ngAfterViewInit]')
    document.getElementsByTagName("html")[0].classList.add("light-theme")

    this.oAuthService.getActualUser().subscribe((oUser) => {
      console.log('[getActualUser], oUser:', oUser)
      this.oUserInfo = oUser;
    })

    this.onUpdateUser();

    /*let initialUrl = this.oRouter.url
    if (initialUrl.indexOf('/chart') !== -1) {
      this.sActiveMenu = undefined;
    } else if (initialUrl.indexOf('/profile') !== -1) {
      this.sActiveMenu = 'profile';
    } else if (initialUrl.indexOf('/open') !== -1) {
      this.sActiveMenu = 'open';
    } else if (initialUrl.indexOf('/history') !== -1) {
      this.sActiveMenu = 'history';
    } else if (initialUrl.indexOf('/settings') !== -1) {
      this.sActiveMenu = 'settings';
    } else if (initialUrl.indexOf('/event-logs') !== -1) {
      this.sActiveMenu = 'event-logs';
    }*/
  }

  getsActiveMenu() {
    return this.sActiveMenu;
  }

  onUpdateUser() {
    console.log('[onUpdateUser]')
    /*let oCurrentUser: any = {};
    let localStorageUser: any = '';
    if (localStorage.getItem('currentUser')) {
      localStorageUser = localStorage.getItem('currentUser');
    }
    // if (localStorage.getItem('currentUser') && typeof localStorage.getItem('currentUser') === 'string') {
    try {
      oCurrentUser = localStorageUser ? JSON.parse(localStorageUser) : localStorageUser
    } catch (e) {
      console.error(e)
    }
    // }
    if (oCurrentUser && oCurrentUser.id) {
      this.oAuthService.getUser(oCurrentUser.id).pipe(
        tap(data => console.log(data)) // выводим все данные, которые получаем с сервера
      )
        .subscribe(
          (data) => {
            this.oUserInfo = data.user;
            this.oObservable_UserInfo.next(data.user);
          },
          (error) => {
            console.error('Ошибка получения данных пользователя', error);
          }
        );
    }*/
    this.oAuthService.onUpdateOrGetUser()
  }

  getCurrentPrice = () => {
    let nCurrentPrice_Return = 0;
    let oCurrentPrice = this.oTradesService.getoActualInfo_Pair(this.selectedSymbol)
    if (oCurrentPrice && oCurrentPrice.c) {
      nCurrentPrice_Return = oCurrentPrice.c;
    }else if (oCurrentPrice && oCurrentPrice.close) {
      nCurrentPrice_Return = oCurrentPrice.close;
    }

    return nCurrentPrice_Return;
  }

  get currentPrice$(): Observable<number> {
    return this.oTradesService.currentPrice$;
  }

  onShoulderChange(ev: string) {
    this.nLeverage = Number(ev);
  }

  public onChoosePair = (sPair: string) => {
    let oPairPrice: any = this.oTradesService.getLastPriceByPair(sPair);

    /*this.checkIsNullPair(sPair).subscribe((oData: any) => {
      if (oData && oData.historicalData) {
        let oCurrentPrice = oData.historicalData[oData.historicalData.length - 1];
        let nPrice = parseFloat(oCurrentPrice[4]) !== 0
          ? parseFloat(oCurrentPrice[4])
          : parseFloat(oCurrentPrice[3]);
        if ((nPrice !== 0)) {
          this.onCurrencyPairChanged(sPair)
        }else {
          this.modalService.open('Pair is not available', 'warning')
        }
      }
    })*/
    console.log('oPairPrice', oPairPrice)
    if (oPairPrice) {
      // let oCurrentPrice = oData[oData.length - 1];
      let nPrice = parseFloat(oPairPrice.c)/* !== 0*/
      /*? parseFloat(oPairPrice.c)
      : parseFloat(oCurrentPrice[3]);*/
      if (nPrice !== 0) {
        this.onCurrencyPairChanged(sPair)
      }else {
        this.modalService.open('Pair is not available', 'warning')
      }
    }
      // this.onCurrencyPairChanged(ev)
  }

 /* checkIsNullPair = (sPair) => {
    return this.oTradesService.getLastPriceByPair(sPair)
  }*/

  onCurrencyPairChanged(symbol: string): void {
    // this.oTradesService.updateActiveTrades(this.oUserInfo._id);
    this.selectedSymbol = symbol;
    this.oTradesService.onSymbolChanged(symbol, this.selectedTimeframe)
    this.sObservable_SelectedSymbol.next(symbol);
  }

  getCurrencyPair(): Observable<any> {
    return this.sObservable_SelectedSymbol;
  }

  getTimeFrame(): Observable<any> {
    return this.sObservable_SelectedTimeFrame;
  }

  getRealTimeFrame(): Observable<any> {
    return this.sObservable_RealTimeFrame;
  }

  /*getoUserInfo(): Observable<UserModel> {
    // return this.oObservable_UserInfo;
  }*/

  onClickMenu = (sKey_Menu: string) => {
    if (sKey_Menu !== this.sActiveMenu) {
      this.sActiveMenu = sKey_Menu;
      this.oRouter.navigateByUrl(`terminal/${sKey_Menu}`)
    }
  }

  onChooseTradeActionBar = (sKey: string) => {
    this.sTradeActionBar = sKey;
  }


  async onBuySubmit() {
    if (!this.oTradesService.isInTradeAction()) {
      if ((!this.oUserInfo.bDemoAccount && this.nAmountToPrecess > 0
        && this.nAmountToPrecess <= Number(this.oUserInfo.sBalance) ||
        (this.oUserInfo.bDemoAccount && this.nAmountToPrecess > 0
          && this.nAmountToPrecess <= Number(this.oUserInfo.sBalance_Demo)))
      ) {
        const trade: Trade = {
          stopLoss: this.nStopLoss ? String(this.nStopLoss) : '',
          takeProfit: this.nTakeProfit ? String(this.nTakeProfit) : '',
          bDemoAccount: this.oUserInfo.bDemoAccount,
          leverage: this.nLeverage,
          id: Date.now(),
          symbol: this.selectedSymbol,
          tradeType: 'buy',
          amount: this.nAmountToPrecess
        };

        this.nTakeProfit = 0;
        this.nStopLoss = 0;
        this.bAvailableStopLoss = false;
        this.bAvailableTakeProfit = false;
        this.nAmountToPrecess = 0;
        this.nLeverage = 1;

        this.oTradesService.addTrade(trade, this.oUserInfo._id, this)
      }
    }
  }

  isInTradeAction() {
    return this.oTradesService.isInTradeAction();
  }

  async onSellSubmit() {
    if (!this.oTradesService.isInTradeAction()) {
      if ((!this.oUserInfo.bDemoAccount && this.nAmountToPrecess > 0
        && this.nAmountToPrecess <= Number(this.oUserInfo.sBalance) ||
        (this.oUserInfo.bDemoAccount && this.nAmountToPrecess > 0
          && this.nAmountToPrecess <= Number(this.oUserInfo.sBalance_Demo)))
      ) {
        const trade: Trade = {
          stopLoss: this.nStopLoss ? String(this.nStopLoss) : '',
          takeProfit: this.nTakeProfit ? String(this.nTakeProfit) : '',
          bDemoAccount: this.oUserInfo.bDemoAccount,
          leverage: this.nLeverage,
          id: Date.now(),
          symbol: this.selectedSymbol,
          tradeType: 'sell',
          amount: this.nAmountToPrecess
        };

        this.nTakeProfit = 0;
        this.nStopLoss = 0;
        this.bAvailableStopLoss = false;
        this.bAvailableTakeProfit = false;
        this.nAmountToPrecess = 0;
        this.nLeverage = 1;

        this.oTradesService.addTrade(trade, this.oUserInfo._id, this)
      }
    }
  }

  onToggleTakeProfitAvailable = (ev) => {
    if (ev === false) {
      this.nTakeProfit = 0;
    }
  }

  onToggleStopLossAvailable = (ev) => {
    if (ev === false) {
      this.nStopLoss = 0;
    }
  }

  onTimeframeChanged(sInterval): void {
    this.selectedTimeframe = sInterval;
    this.sObservable_SelectedTimeFrame.next(sInterval);
    this.realtimeTimeframe = this.convertTimeframeToRealtime(sInterval);
    // this.oTradesService.onSymbolChanged(this.selectedSymbol, this.selectedTimeframe)
    this.sObservable_RealTimeFrame.next(this.convertTimeframeToRealtime(sInterval));
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
      case '1D':
        return '1h';
      case '1W':
        return '1h';
      case '1M':
        return '1D';
      default:
        return '1m';
    }
  }

  onSignOut = () => {
    localStorage.clear();
    this.oRouter.navigateByUrl('/')
  }
}
