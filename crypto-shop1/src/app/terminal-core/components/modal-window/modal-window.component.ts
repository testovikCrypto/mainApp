import {Component, HostBinding, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({opacity: 0}),
        animate('0.3s ease-out', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({opacity: 0})),
      ]),
    ]),
  ],
})
export class ModalWindowComponent {

  constructor(private modalService: ModalService) {
  }

  @Input() message: string;
  @Input() type: 'info' | 'warning' | 'error';

  // This property is necessary for the animation
  @HostBinding('@openClose') openClose = true;

  close(): void {
    this.modalService.close();
  }

  getTitleColor = () => {
    let sTitleColor_Return: string;
    if (this.type === 'info') {
      sTitleColor_Return = '#8E96B0';
    } else if (this.type === 'warning') {
      sTitleColor_Return = '#FFBD0D';
    } else if (this.type === 'error') {
      sTitleColor_Return = '#FD2929';
    }

    return sTitleColor_Return;
  }
}
