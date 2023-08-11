import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() bMobile?: boolean;
  public sName_Indicator_Active;
  constructor() {
    this.sName_Indicator_Active = localStorage.getItem('sActiveIndicator');
    if (!this.sName_Indicator_Active) {
      this.sName_Indicator_Active = 'clear';
    }
  }

  ngOnInit(): void {
  }

  onChooseIndicator = (sName_Indicator: string) => {
    let sActiveIndicator = localStorage.getItem('sActiveIndicator');
    if (sActiveIndicator && sActiveIndicator !== sName_Indicator) {
      localStorage.setItem('sActiveIndicator', sName_Indicator);
      this.sName_Indicator_Active = sName_Indicator;
    } else if (!sActiveIndicator && sActiveIndicator !== sName_Indicator) {
      localStorage.setItem('sActiveIndicator', sName_Indicator);
      this.sName_Indicator_Active = sName_Indicator;
    } else {
      localStorage.removeItem('sActiveIndicator');
      this.sName_Indicator_Active = null;
    }
  }
}
