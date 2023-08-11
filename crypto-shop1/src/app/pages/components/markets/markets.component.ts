import {Component, Input} from '@angular/core';
import {TypeMarketPage} from "../../../../types";
import {marketsData} from "../../../../static";
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
export class MarketsComponent {
  @Input() data: TypeMarketPage = {} as TypeMarketPage;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route
      .data
      .subscribe((data: Data) => { this.data = data["marketsData"]} );
  }
}
