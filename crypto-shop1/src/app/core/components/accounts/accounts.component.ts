import {Component, Input} from '@angular/core';
import {TypeAccountCard} from "../../../../types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
  @Input() data: TypeAccountCard [] = [];
  constructor(private oRouter: Router) {
  }

  onClickStartTrading = () => {
    this.oRouter.navigateByUrl('/auth/register')
  }
}
