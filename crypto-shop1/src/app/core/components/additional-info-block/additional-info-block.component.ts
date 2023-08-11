import {Component, Input} from '@angular/core';
import {TypeIntroduction} from "../../../../types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-additional-info-block',
  templateUrl: './additional-info-block.component.html',
  styleUrls: ['./additional-info-block.component.scss']
})
export class AdditionalInfoBlockComponent {
  constructor(private oRouter: Router) {
  }
  @Input() data : TypeIntroduction = {} as TypeIntroduction;

  onClickStartTrading = () => {
    this.oRouter.navigateByUrl('/auth/register')
  }
}
