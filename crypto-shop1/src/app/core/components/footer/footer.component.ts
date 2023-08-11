import { Component } from '@angular/core';
import {TypeNavItem} from "../../../../types";
import {linksFooter} from "../../../../static";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private oRouter: Router) {
  }
  data: TypeNavItem[] = linksFooter;

  onClickStartTrading = () => {
    this.oRouter.navigateByUrl('/auth/register')
  }
}
