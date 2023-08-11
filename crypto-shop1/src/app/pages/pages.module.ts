import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import {CoreModule} from "../core/core.module";
import { TradingConditionsComponent } from './components/trading-conditions/trading-conditions.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import {SafePipe} from "../core/pipes/safe-pipe";
import { MarketsComponent } from './components/markets/markets.component';
import { LoginComponent } from './components/login/login.component';
import {Router, RouterModule} from "@angular/router";
import { TerminalComponent } from './components/terminal/terminal.component';
import {TerminalCoreModule} from "../terminal-core/terminal-core.module";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../core/services/auth.service";
import {FilterMobilePipe} from "../core/pipes/filter-mobile-pipe";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    FilterMobilePipe,
    TradingConditionsComponent,
    AboutComponent,
    ContactsComponent,
    MarketsComponent,
    LoginComponent,
    TerminalComponent,

  ],
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        RouterModule,
        TerminalCoreModule,
        FormsModule,
    ]
})
export class PagesModule {
  constructor(private oAuthService: AuthService, private oRouter: Router) {
    if (this.oAuthService.isLoggedIn()) {
      this.oRouter.navigateByUrl('/terminal/chart');
    }else {
      this.oRouter.navigateByUrl('/')
    }
  }
}
