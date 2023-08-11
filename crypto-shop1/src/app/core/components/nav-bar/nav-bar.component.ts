import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TypeNavItem} from "../../../../types";
import {linksHeader} from "../../../../static";
import {NgbDropdown} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  activeId: number = -1;
  @Input() secondary: boolean = false;
  @Input() navItems: TypeNavItem [] = linksHeader;

  over(drop:NgbDropdown){
    drop.open()
  }
  out(drop:NgbDropdown){
    drop.close()
  }

  ngAfterViewInit () {
    // this.isSelectNav = true;
  }
}
