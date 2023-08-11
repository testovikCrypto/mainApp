import {Component, Input} from '@angular/core';
import {TypeStatsCard} from "../../../../types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  constructor(private oRouter: Router) {
  }
  @Input () data: TypeStatsCard [] = [];

  onClickStartTrading = () => {
    this.oRouter.navigateByUrl('/auth/register')
  }
}
