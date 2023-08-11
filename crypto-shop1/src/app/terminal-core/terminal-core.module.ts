import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {ChartComponent} from "./components/chart/chart.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import { ProfileComponent } from './components/profile/profile.component';
import { OpenComponent } from './components/open/open.component';
import { HistoryComponent } from './components/history/history.component';
import { EventLogsComponent } from './components/event-logs/event-logs.component';
import { SettingsComponent } from './components/settings/settings.component';
import {FormsModule} from "@angular/forms";
import { VerificationComponent } from './components/verification/verification.component';
import {FilterPipe} from "../core/pipes/filter-pipe";
import {OrderPipe} from "../core/pipes/order-pipe";
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import {CoreModule} from "../core/core.module";
import { ChartNewComponent } from './components/chart-new/chart-new.component';


@NgModule({
    declarations: [
        HeaderComponent,
        ChartComponent,
        ToolbarComponent,
        ProfileComponent,
        OpenComponent,
        HistoryComponent,
        EventLogsComponent,
        SettingsComponent,
        VerificationComponent,
        FilterPipe,
        OrderPipe,
        ModalWindowComponent,
        ChartNewComponent
    ],
  exports: [
    HeaderComponent,
    ChartComponent,
    ToolbarComponent,
    ChartNewComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        CoreModule
    ],
  providers: [ChartComponent, ChartNewComponent]
})
export class TerminalCoreModule {}
