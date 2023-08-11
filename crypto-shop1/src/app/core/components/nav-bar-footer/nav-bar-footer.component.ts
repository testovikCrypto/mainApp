import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TypeNavItem} from "../../../../types";
import {linksHeader} from "../../../../static";
import {NgbDropdown} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-nav-bar-footer',
  templateUrl: './nav-bar-footer.component.html',
  styleUrls: ['./nav-bar.component-footer.scss']
})
export class NavBarFooterComponent {
  activeId: number = 0;
  @Input() secondary: boolean = false;
  @Input() navItems: TypeNavItem [] = linksHeader;

  over(drop:NgbDropdown){
    drop.open()
  }
  out(drop:NgbDropdown){
    drop.close()
  }
}
