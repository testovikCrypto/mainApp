import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./core/components/dashboard/dashboard.component";
import {HomeComponent} from "./pages/components/home/home.component";
import {TradingConditionsComponent} from "./pages/components/trading-conditions/trading-conditions.component";
import {AboutComponent} from "./pages/components/about/about.component";
import {ContactsComponent} from "./pages/components/contacts/contacts.component";
import {MarketsComponent} from "./pages/components/markets/markets.component";
import {marketsData} from "../static";
import {TypeMarketPage} from "../types";
import {LoginComponent} from "./pages/components/login/login.component";
import {RegisterComponent} from "./core/components/register/register.component";
import {ForgotComponent} from "./core/components/forgot/forgot.component";
import {TerminalComponent} from "./pages/components/terminal/terminal.component";
import {ProfileComponent} from "./terminal-core/components/profile/profile.component";
import {OpenComponent} from "./terminal-core/components/open/open.component";
import {SettingsComponent} from "./terminal-core/components/settings/settings.component";
import {HistoryComponent} from "./terminal-core/components/history/history.component";
import {EventLogsComponent} from "./terminal-core/components/event-logs/event-logs.component";
import {ChartComponent} from "./terminal-core/components/chart/chart.component";
import {VerificationComponent} from "./terminal-core/components/verification/verification.component";
import {ChartNewComponent} from "./terminal-core/components/chart-new/chart-new.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'markets',
    children: [
      {
        path: "currencies",
        component: MarketsComponent,
        data: {
          marketsData: marketsData.find(data => data.name === "currencies") as TypeMarketPage
        }
      },
      {
        path: "metals",
        component: MarketsComponent,
        data: {
          marketsData: marketsData.find(data => data.name === "metals") as TypeMarketPage
        }
      },
      {
        path: "stock",
        component: MarketsComponent,
        data: {
          marketsData: marketsData.find(data => data.name === "stock") as TypeMarketPage
        }
      },
      {
        path: "products",
        component: MarketsComponent,
        data: {
          marketsData: marketsData.find(data => data.name === "products") as TypeMarketPage
        }
      },
      {
        path: "indicies",
        component: MarketsComponent,
        data: {
          marketsData: marketsData.find(data => data.name === "indicies") as TypeMarketPage
        }
      },
      {
        path: "cryptocurrencies",
        component: MarketsComponent,
        data: {
          marketsData: marketsData.find(data => data.name === "cryptocurrencies") as TypeMarketPage
        }
      },

    ]
  },
  {
    path: 'contact',
    component: ContactsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'conditions',
    component: TradingConditionsComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },

    ]
  },
  {
    path: 'terminal',
    component: TerminalComponent,
    children: [
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "open",
        component: OpenComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'event-logs',
        component: EventLogsComponent
      },
      {
        path: 'chart',
        component: ChartNewComponent
      },
      {
        path: 'verification',
        component: VerificationComponent
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
