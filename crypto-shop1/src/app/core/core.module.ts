import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from "@angular/router";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ConfidenceComponent } from './components/confidence/confidence.component';
import { AdditionalComponent } from './components/additional/additional.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { StepsComponent } from './components/steps/steps.component';
import { PartnersComponent } from './components/partners/partners.component';
import { FooterComponent } from './components/footer/footer.component';
import {NavBarFooterComponent} from "./components/nav-bar-footer/nav-bar-footer.component";
import { WorthComponent } from './components/worth/worth.component';
import { StatsComponent } from './components/stats/stats.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import {SafePipe} from "./pipes/safe-pipe";
import { HeaderSpacerComponent } from './components/header-spacer/header-spacer.component';
import { AdvantagesComponent } from './components/advantages/advantages.component';
import { AdditionalInfoBlockComponent } from './components/additional-info-block/additional-info-block.component';
import { ToolTableComponent } from './components/tool-table/tool-table.component';
import { AuthSideBarComponent } from './components/auth-side-bar/auth-side-bar.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { RegisterComponent } from './components/register/register.component';
import {IntlTelInputNgModule} from "intl-tel-input-ng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SocketClient} from "../../socketClient";

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    LogoComponent,
    NavBarComponent,
    IntroductionComponent,
    ConfidenceComponent,
    AdditionalComponent,
    AccountsComponent,
    StepsComponent,
    PartnersComponent,
    FooterComponent,
    NavBarFooterComponent,
    WorthComponent,
    StatsComponent,
    BenefitsComponent,
    SafePipe,
    HeaderSpacerComponent,
    AdvantagesComponent,
    AdditionalInfoBlockComponent,
    ToolTableComponent,
    AuthSideBarComponent,
    ForgotComponent,
    RegisterComponent,
  ],
  exports: [
    HeaderComponent,
    DashboardComponent,
    LogoComponent,
    NavBarComponent,
    IntroductionComponent,
    ConfidenceComponent,
    AdditionalComponent,
    AccountsComponent,
    StepsComponent,
    PartnersComponent,
    FooterComponent,
    WorthComponent,
    StatsComponent,
    BenefitsComponent,
    SafePipe,
    HeaderSpacerComponent,
    AdditionalInfoBlockComponent,
    AdvantagesComponent,
    ToolTableComponent,
    AuthSideBarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        IntlTelInputNgModule.forRoot(),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [SocketClient]
})
export class CoreModule { }
