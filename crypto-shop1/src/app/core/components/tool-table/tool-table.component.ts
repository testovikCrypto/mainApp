import {Component, Input} from '@angular/core';
import {TypeToolCard} from "../../../../types";

@Component({
  selector: 'app-tool-table',
  templateUrl: './tool-table.component.html',
  styleUrls: ['./tool-table.component.scss']
})
export class ToolTableComponent {
  @Input() data: TypeToolCard = {} as TypeToolCard;
  @Input() secondary: boolean = false;
}
