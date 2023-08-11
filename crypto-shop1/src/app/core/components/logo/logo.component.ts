import {Component, Input} from '@angular/core';
import {logoSrc, logoSrcHover} from "./../../../../static";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() href: string = "/";
  @Input() secondary: boolean = false;

  get logoSrc(): string {
    return !this.secondary ?  logoSrcHover : logoSrc;
  }

}
