import { Component } from '@angular/core';
import {accountCards, stepsCards, tradingConditionsIntroduction} from "../../../../static";

@Component({
  selector: 'app-trading-conditions',
  templateUrl: './trading-conditions.component.html',
  styleUrls: ['./trading-conditions.component.scss']
})
export class TradingConditionsComponent {
  conditionIntroduction = tradingConditionsIntroduction;
  accountCards = accountCards;
  stepsCards = stepsCards;
}
