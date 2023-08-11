import {Component, Input} from '@angular/core';
import {TypeStepCard} from "../../../../types";
import {image2} from "../../../../static";
import {Router} from "@angular/router";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent {
  constructor(private oRouter: Router) {
  }
  @Input() data: TypeStepCard [] = [];
  image2 = image2;

  onClickStartTrading = () => {
    this.oRouter.navigateByUrl('/auth/register')
  }
}
