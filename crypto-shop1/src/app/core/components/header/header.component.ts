import {Component, HostListener, Input} from '@angular/core';
import { throttle } from "../../decorators/throttle";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {linksHeader} from "../../../../static";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() secondary = true;
  event$: any;
  aHeaderItems = linksHeader;

  constructor(private location: Location,
              private oAuthService: AuthService,
              private oRouter: Router
  ) {
    this.setSecondary();

    this.event$ = location.onUrlChange((val) => {
      this.setSecondary();
    })
  }

  onLogout = () => {
    /*this.oAuthService.logout();
    this.oAuthService.getLogoutSuccess().subscribe((data) => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      window.location.reload();
    });
    this.oAuthService.getLogoutError().subscribe((error) => {
      console.log('Logout error:', error);
    })*/
  }

  onDropdownMenuClick = (oItem, ev?) => {
    if (ev) {
      ev.stopPropagation();
    }

    this.oRouter.navigateByUrl(oItem.href)
  }

  isLoggedIn = () => {
    return this.oAuthService.isLoggedIn();
  }

  setSecondary (passedLength: number = -1) {
    this.secondary = passedLength > 0 || !this.isUrlHome();
  }

  isUrlHome () {
    const path = this.location.path();
    return path  === "";
  }

  @HostListener('window:scroll', ['$event'])
  @throttle(250)
  scroll(event: any) {
    const passedLength =  document.documentElement.scrollTop
      || document.body.scrollTop || 0;

    this.setSecondary(passedLength);
  }

  ngOnDestroy() {
    if (typeof this.event$.unsubscribe === "function")
      this.event$?.unsubscribe()
  }

  onClickStartTrading = () => {
    this.oRouter.navigateByUrl('/auth/register')
  }
}
