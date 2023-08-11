import {Component, Input} from '@angular/core';
import {TypeIntroduction} from "../../../../types";
import {homeIntroduction} from "../../../../static";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  constructor(private oAuthService: AuthService, private oRouter: Router) {
  }
  @Input () data: TypeIntroduction = {} as TypeIntroduction;

  onClickStartTrading = () => {
    if (this.oAuthService.isLoggedIn()) {
      this.oRouter.navigateByUrl('/terminal/chart')
    }else {
      this.oRouter.navigateByUrl('/auth/register')
    }
  }
}
