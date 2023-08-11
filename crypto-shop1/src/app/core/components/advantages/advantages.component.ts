import {Component, Input} from '@angular/core';
import {TypeStatsCard} from "../../../../types";

@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss']
})
export class AdvantagesComponent {
  @Input() data: TypeStatsCard [] = [];
}
