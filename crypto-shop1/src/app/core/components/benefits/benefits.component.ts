import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent {
  constructor(private oRouter: Router) {
  }

  onClickStartTrading = () => {
    this.oRouter.navigateByUrl('/auth/register')
  }
}
