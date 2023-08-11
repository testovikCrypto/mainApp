import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {CoreModule} from "./core/core.module";
import {RouterModule} from "@angular/router";
import {PagesModule} from "./pages/pages.module";
import {IntlTelInputNgModule} from "intl-tel-input-ng";
import {OpenComponent} from "./terminal-core/components/open/open.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    PagesModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule,
    IntlTelInputNgModule.forRoot()
  ],
  providers: [OpenComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
