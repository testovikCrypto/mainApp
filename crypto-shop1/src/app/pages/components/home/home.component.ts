import { Component } from '@angular/core';
import {
  about2Introduction,
  aboutIntroduction, accountCards, additionalCards, confidenceCards,
  homeIntroduction, partnersCards, stepsCards,
  tradingConditionsIntroduction
} from "../../../../static";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  homeData = homeIntroduction;
  about2Data = about2Introduction;
  tradingConditionsData = tradingConditionsIntroduction;
  aboutData = aboutIntroduction;
  confidenceCards = confidenceCards;
  additionalCards = additionalCards;
  accountCards = accountCards;
  stepsCards = stepsCards;
  partnersCards = partnersCards;

}
