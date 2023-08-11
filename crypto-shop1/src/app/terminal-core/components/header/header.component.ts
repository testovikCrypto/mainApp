import {AfterViewInit, Component, Input} from '@angular/core';
import {TerminalComponent} from "../../../pages/components/terminal/terminal.component";
import {AuthService} from "../../../core/services/auth.service";
import {TradesService} from "../../../core/services/trades.service";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'terminal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @Input() oUserInfo: any;
  public sReplenishMethod: string = 'TRC20'
  public sCurrentCurrencyPair: string;
  public nAmountToReplenish: number = 0;
  public bReplenishAmountSubmitted: boolean = false
  public nCurrentTimer = 60;
  public timerInterval;
  public oActualReplenishWallets;
  public sChosenWallet;

  public sWalletNumber: string;
  public bWithdrawAmountSubmitted: boolean = false;
  public nAmountToWithdraw = 0;
  public sWithdrawMethod: string = 'BTC';
  public sChosenWallet_Withdraw: string;
  public asSymbol;
  public sSearchPair: string;
  public sWithdrawNetwork: string = 'Bitcoin'

  public aoGatewayReplenishWallets: any;

  constructor(private oTerminalComponent: TerminalComponent,
              private oAuthService: AuthService,
              private oTradesService: TradesService,
              private modalService: ModalService
  ) {
    // this.setInitialPairByActiveTrades();

    this.oTerminalComponent.getCurrencyPair().subscribe((sPair) => {
      this.sCurrentCurrencyPair = sPair;
    })

    this.oTradesService.getAllSymbols().subscribe((oRes: any) => {
      if (oRes && oRes.symbols && oRes.symbols.length) {
        this.asSymbol = oRes.symbols;
      }
    })
  }

  ngAfterViewInit() {
    // this.oTradesService.subscribeToRealtimePriceActiveTrades();
    let elemReplenishModal = document.getElementById('ReplenishModal');
    elemReplenishModal.addEventListener('shown.bs.modal', (ev) => {

      /*this.oAuthService.getActualReplenishWallets().subscribe((oRes: any) => {
        if (oRes && oRes.wallets && oRes.wallets[0] && oRes.wallets[0].oWallets) {
          this.oActualReplenishWallets = oRes.wallets[0].oWallets;
          this.sChosenWallet = this.oActualReplenishWallets['BTC']['Bitcoin'];
        }
      })*/
      this.oAuthService.getGatewayReplenishWalletsFiltered().subscribe((aWallets: any) => {
        if (aWallets && aWallets.length) {
          this.aoGatewayReplenishWallets = aWallets;
          let aoChosenWallet = this.aoGatewayReplenishWallets.filter((oGatewayWallet) => {
            return oGatewayWallet.sNetwork === this.sReplenishMethod ? oGatewayWallet.sWallet : '';
          })

          if (aoChosenWallet && aoChosenWallet.length) {
            this.sChosenWallet = aoChosenWallet[0].sWallet;
          }
        }
      })
    })
    elemReplenishModal.addEventListener('hidden.bs.modal', (ev) => {
      clearInterval(this.timerInterval);
      this.oActualReplenishWallets = {};
      this.bReplenishAmountSubmitted = false;
      this.nAmountToReplenish = 0;
      this.sWalletNumber = '';
      this.nCurrentTimer = 60;
    })

    let elemWithdrawModal = document.getElementById('WithdrawModal');
    elemWithdrawModal.addEventListener('shown.bs.modal', (ev) => {
      this.oAuthService.getActualReplenishWallets().subscribe((oRes: any) => {
        if (oRes && oRes.wallets && oRes.wallets[0] && oRes.wallets[0].oWallets) {
          this.oActualReplenishWallets = oRes.wallets[0].oWallets;
          this.sChosenWallet_Withdraw = this.oActualReplenishWallets['BTC']['Bitcoin'];
        }
      })
    })
    elemWithdrawModal.addEventListener('hidden.bs.modal', (ev) => {
      clearInterval(this.timerInterval);
      // this.oActualReplenishWallets = {};
      this.bWithdrawAmountSubmitted = false;
      this.nAmountToWithdraw = 0;
    })
  }

  showError(): void {
    this.modalService.open('An error occurred', 'error');
  }

  getsActiveMenu = () => {
    return this.oTerminalComponent.getsActiveMenu();
  }

  isAnyActiveTrades = () => {
    return this.oTradesService.isAnyActiveTrades()
  }

  getUserPhoto = () => {
    let sPhoto_Return;
    if (this.oUserInfo.sProfilePhoto) {
      sPhoto_Return = this.oUserInfo.sProfilePhoto
    } else {
      sPhoto_Return = 'assets/img/humanPhotoMissing.jpeg'
    }
    return sPhoto_Return
  }

  /*setInitialPairByActiveTrades = () => {
    let nLastActiveIndex = undefined;
    this.oTradesService.getActiveTrades().subscribe((aActiveTrades) => {
      if (aActiveTrades && aActiveTrades.length) {
        for(let i = 0; i < aActiveTrades.length; i++) {
          if(!aActiveTrades[i].dealOpened) {
            console.log('aActiveTrades[i].symbol', aActiveTrades[i].symbol)
            this.onCurrencyPaidChanged(aActiveTrades[i].symbol);
            break;
          }
        }

        if (!nLastActiveIndex) {
          aActiveTrades = aActiveTrades.sort((a, b) => {
            return new Date(a.dealOpened) > new Date(b.dealOpened)
          })
          console.log('aActiveTrades', aActiveTrades)
          console.log('aActiveTrades[0].symbol', aActiveTrades[0].symbol)
          this.onCurrencyPaidChanged(aActiveTrades[0].symbol);
        }

      }
    })
  }*/

  onCurrencyPaidChanged = (ev) => {
    this.oTerminalComponent.onCurrencyPairChanged(ev);
  }

  onChooseWithdrawMethod = (sKey_Token) => {
    this.sWalletNumber = '';
    this.sWithdrawMethod = sKey_Token;
    let aPossibleNetworks = Object.keys(this.oActualReplenishWallets[sKey_Token]);
    this.sChosenWallet_Withdraw = this.oActualReplenishWallets[sKey_Token][aPossibleNetworks[0]];
    this.sWithdrawNetwork = aPossibleNetworks[0];
  }

  onChooseReplenishMethod = (sKey_Token) => {
    this.sReplenishMethod = sKey_Token;
    let aoChosenWallet = this.aoGatewayReplenishWallets.filter((oGatewayWallet) => {
      return oGatewayWallet.sNetwork === sKey_Token;
    })

    if (aoChosenWallet && aoChosenWallet.length) {
      this.sChosenWallet = aoChosenWallet[0].sWallet;
    }
    // let aPossibleNetworks = Object.keys(this.oActualReplenishWallets[sKey_Token]);
    // this.sChosenWallet = this.oActualReplenishWallets[sKey_Token][aPossibleNetworks[0]];
  }

  onChoosePair = async (sPair) => {
    let oPairPrice: any
    await this.oTradesService.getLastPriceByPair(sPair).then((oRes) => {
      if (oRes.c) {
        oPairPrice = oRes;
        if (oPairPrice) {
          let nPrice = parseFloat(oPairPrice.c)
          if (nPrice !== 0) {
            this.onCurrencyPaidChanged(sPair)
          } else {
            this.modalService.open('Pair is not available', 'warning')
          }
        }
      } else if (oRes) {
        oRes.subscribe((aResp) => {
          oPairPrice = aResp[aResp.length - 1];
          if (oPairPrice) {
            let nPrice = parseFloat(oPairPrice[4])
            if (nPrice !== 0) {
              this.onCurrencyPaidChanged(sPair)
            } else {
              this.modalService.open('Pair is not available', 'warning')
            }
          }
        })
      }

      /*if (oPairPrice) {
        // let oCurrentPrice = oData[oData.length - 1];
        let nPrice = parseFloat(oPairPrice.c)/!* !== 0*!/
        /!*? parseFloat(oPairPrice.c)
        : parseFloat(oCurrentPrice[3]);*!/
        if (nPrice !== 0) {
          this.onCurrencyPaidChanged(sPair)
        }else {
          this.modalService.open('Pair is not available', 'warning')
        }
      }*/
    })
    /*await this.oTradesService.getLastPriceByPair(sPair).then((oRes) => {
      console.log(21312312312, 'oRes', oRes)
      oPairPrice = oRes;
    });*/
    console.log(2222, 'oPairPrice', oPairPrice)

    /*if (this.checkIsNullPair(sPair) !== 0) {

    }*/
    /*this.checkIsNullPair(sPair).then((oData: any) => {
      if (oData && oData.length) {
        let oCurrentPrice = oData[oData.length - 1];
        let nPrice = parseFloat(oCurrentPrice[4]) !== 0
          ? parseFloat(oCurrentPrice[4])
          : parseFloat(oCurrentPrice[3]);
        if ((nPrice !== 0)) {
          this.onCurrencyPaidChanged(sPair)
        }else {
          this.modalService.open('Pair is not available', 'warning')
        }
      }
    })*/
  }

  getCurrentTimerValue = () => {
    return this.nCurrentTimer * 100 / 60 + '%'
  }

  getCurrentTextTimerValue = () => {
    return this.nCurrentTimer + 'm';
  }

  isAvailableAmountToWithdraw = () => {
    let bAvailable_Return = false;
    let sUserBalance;
    /*this.oTerminalComponent.getoUserInfo().subscribe((oRes) => {
      sUserBalance = oRes.sBalance
    });*/
    this.oAuthService.getActualUser().subscribe((oUser) => {
      sUserBalance = oUser.sBalance;
    })
    if (this.nAmountToWithdraw >= 15 && this.nAmountToWithdraw <= Number(sUserBalance)) {
      bAvailable_Return = true;
    }

    return bAvailable_Return;
  }

  onSubmitWithdrawAmount = () => {
    if (this.isAvailableAmountToWithdraw() && !this.bWithdrawAmountSubmitted) {
      this.bWithdrawAmountSubmitted = true;
    }
  }

  onSubmitReplenishAmount = () => {
    if (this.nAmountToReplenish >= 15 && !this.bReplenishAmountSubmitted) {
      this.bReplenishAmountSubmitted = true;
      this.timerInterval = setInterval(() => {
        this.nCurrentTimer = this.nCurrentTimer - 1;
      }, 1000 * 60);
    }
  }

  onConfirmReplenishTransaction = () => {
    let oUser: any = localStorage.getItem('currentUser');
    try {
      oUser = JSON.parse(oUser);
    } catch (e) {
      console.error(e)
    }
    let sUserID = oUser.id;
    this.oAuthService.onSubmitReplenish(sUserID, this.nAmountToReplenish)
  }

  onUseDemoAccount = async () => {
    let aActiveTrades;
    await this.oTradesService.getActiveTrades().subscribe((aRes) => {
      aActiveTrades = aRes
    })

    if (aActiveTrades && aActiveTrades.length) {
      alert('You can not change account type until all active trades are closed.')
    } else {
      /*this.oTerminalComponent.getoUserInfo().subscribe((oUserInfo) => {
        this.oAuthService.onToggleUserDemoAccount(oUserInfo._id, true).subscribe(() => {
          window.location.reload();

          // this.oTerminalComponent.onUpdateUser();
        });
      });*/
      this.oAuthService.getActualUser().subscribe((oUser) => {
        this.oAuthService.onToggleUserDemoAccount(oUser._id, true).subscribe(() => {
          window.location.reload();
          // this.oTerminalComponent.onUpdateUser();
        });
      })
    }
  }

  onUseRealAccount = async () => {
    let aActiveTrades;
    await this.oTradesService.getActiveTrades().subscribe((aRes) => {
      aActiveTrades = aRes;
    })

    if (aActiveTrades && aActiveTrades.length) {
      alert('You can not change account type until all active trades are closed.')
    } else {
      /*this.oTerminalComponent.getoUserInfo().subscribe((oUserInfo) => {
        this.oAuthService.onToggleUserDemoAccount(oUserInfo._id, false).subscribe((oRes) => {
          window.location.reload();
          // this.oTerminalComponent.onUpdateUser();
        });
      });*/
      this.oAuthService.getActualUser().subscribe((oUser) => {
        this.oAuthService.onToggleUserDemoAccount(oUser._id, false).subscribe((oRes) => {
          window.location.reload();
        });
      })
    }
  }

  onAddDemoBalance = () => {
    let oUser
    /*this.oTerminalComponent.getoUserInfo().subscribe((oUserInfo) => {
      oUser = oUserInfo;
    });*/
    this.oAuthService.getActualUser().subscribe((oRes) => {
      oUser = oRes;
    })

    this.oTradesService.onPutDemoBalance('10000.00', oUser._id)
  }

  onConfirmWithdrawTransaction = () => {
    if (this.sWalletNumber && this.sWalletNumber.length) {
      let oUser
      /*this.oTerminalComponent.getoUserInfo().subscribe((oUserInfo) => {
        oUser = oUserInfo;
      });*/
      this.oAuthService.getActualUser().subscribe((oRes) => {
        oUser = oRes;
      })
      let sNetwork;
      if (this.sWithdrawMethod === 'BTC') {
        sNetwork = 'Bitcoin';
      } else if (this.sWithdrawMethod === 'ETH') {
        sNetwork = 'ERC20'
      } else if (this.sWithdrawMethod === 'USDT') {
        sNetwork = 'TRC20'
      }
      let sWalletCurrencyNetwork = this.sWithdrawMethod + ' ' + '(' + sNetwork + ')' + ' ' + this.sWalletNumber;
      this.oAuthService.onSubmitWithdraw(oUser._id, this.nAmountToWithdraw, sWalletCurrencyNetwork)
    }
  }
}
