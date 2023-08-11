import { Component } from '@angular/core';
import {TradesService} from "../../../core/services/trades.service";
import {Observable} from "rxjs";
import {TerminalComponent} from "../../../pages/components/terminal/terminal.component";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent {
  aHistoryList = [];

  constructor(private oTradesService: TradesService,
              private oTerminalComponent: TerminalComponent,
              private oAuthService: AuthService) {
    /*let oUser: any = localStorage.getItem('currentUser');
    try {
      oUser = JSON.parse(oUser);
    } catch (e) {
      console.error(e)
    }*/
   /* let sUserID;
    let bDemoAccount: boolean = false;*/
    /*this.oTerminalComponent.getoUserInfo().subscribe((oUser) => {
      sUserID = oUser._id;
      bDemoAccount = oUser.bDemoAccount;

      this.oTradesService.updateHistory(sUserID, bDemoAccount);
    })*/

    /*this.oAuthService.getActualUser().subscribe((oUser) => {
      sUserID = oUser._id;
      bDemoAccount = oUser.bDemoAccount;

      // this.oTradesService.updateHistory(sUserID, bDemoAccount);
    })*/


    this.getHistory()
  }

  isPositiveResult = (sPnlRes) => {
    return sPnlRes.indexOf('-') === -1;
  }

  public getHistory() {
    this.oTradesService.getHistory().subscribe((oRes) => {
      this.aHistoryList = oRes
    })
  }

  onShareTrade = (oTrade) => {

  }

  getFormattedTime = (sDateTime) => {
    return new Date(sDateTime).toLocaleDateString() +' ' + new Date(sDateTime).toLocaleTimeString()
  }
}
