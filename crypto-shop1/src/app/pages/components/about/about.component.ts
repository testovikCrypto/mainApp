import { Component } from '@angular/core';
import {about2Introduction, aboutIntroduction, statsCards} from "../../../../static";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  aboutIntroduction = aboutIntroduction;
  about2Introduction = about2Introduction;
  statsCards = statsCards;
}
