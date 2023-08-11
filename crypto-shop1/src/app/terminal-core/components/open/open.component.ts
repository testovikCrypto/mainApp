import {Component} from '@angular/core';
import {TradesService} from "../../../core/services/trades.service";
import {TerminalComponent} from "../../../pages/components/terminal/terminal.component";

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent {
  aActiveTrades = [];
  bIsInCloseProcess: boolean = false;

  constructor(private oTradesService: TradesService,
              private oTerminalComponent: TerminalComponent) {
    let oUser: any = localStorage.getItem('currentUser');
    try {
      oUser = JSON.parse(oUser);
    } catch (e) {
      console.error(e)
    }
    let sUserID = oUser.id;
    // this.oTradesService.updateActiveTrades(sUserID);

    this.oTradesService.getActiveTrades().subscribe((aActiveTrades) => {
      this.aActiveTrades = aActiveTrades;
    });
  }

  getPNLColor = (sExpectedPNL_Return) => {
    let sColor_Return;
    if (sExpectedPNL_Return.indexOf('-')) {
      sColor_Return = '#0ECB81';
    } else {
      sColor_Return = '#FD2929'
    }

    return sColor_Return;
  }

  onCloseTrade = (oTrade: any) => {
    if (!this.oTradesService.isInTradeAction()) {
      this.oTradesService.closeTrade(oTrade)
    }
  }
}
