import {Component} from '@angular/core';
import {TerminalComponent} from "../../../pages/components/terminal/terminal.component";
import {UserModel} from "../../../../types";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {interval, map, Subscription, take} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public oUser: UserModel;
  public bConfirmationCodeWasSent: boolean = false;
  countdown = '';
  private countdownSubscription: Subscription | null = null;
  bAvailableResendCode: boolean = false;
  sConfirmationEmailCode: string = '';
  sSecret_Email: string = '';

  constructor(private oTerminalComponent: TerminalComponent,
              private oRouter: Router,
              private oAuthService: AuthService
  ) {
    /*this.oTerminalComponent.getoUserInfo().subscribe((data) => {
      this.oUser = data;
    })*/
    this.oAuthService.getActualUser().subscribe((oUser) => {
      this.oUser = oUser;
    })
  }

  onChangeProfilePhoto = (event) => {
    if (event && event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // @ts-ignore
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        // Создайте новый образ и установите его src на результат FileReader
        let img = new Image();
        if (typeof event.target?.result === "string") {
          img.src = event.target?.result;
        }

        img.onload = () => {
          // Создайте новый элемент canvas и получите его 2d контекст
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');

          // Установите новые размеры изображения
          let maxWidth = 800; // Максимальная ширина
          let maxHeight = 800; // Максимальная высота
          let width = img.width;
          let height = img.height;

          // Проверьте, превышают ли размеры изображения максимальные значения
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          // Установите размеры холста
          canvas.width = width;
          canvas.height = height;

          // Отрисуйте изображение на холсте нового размера
          ctx.drawImage(img, 0, 0, width, height);

          // Получите данные изображения с холста
          // Используйте новый Data URL вместо оригинала
          this.oAuthService.onChangeProfilePhoto(this.oUser._id, canvas.toDataURL('image/jpeg', 1))
            .subscribe((oRes: any) => {
              this.oTerminalComponent.onUpdateUser();
            });
        };
      };
    }
  }

  onSendConfirmationCode = () => {
    this.bConfirmationCodeWasSent = true;
    this.initTimer();
    this.oAuthService.sendConfirmationEmail(this.oUser.sEmail).subscribe((oRes: any) => {
      this.sSecret_Email = oRes.sSecret;
    })
  }

  initTimer = () => {
    const countdownStartValue = 2 * 60; // 2 minutes
    this.countdownSubscription = interval(1000) // emit an event every second
      .pipe(
        map(i => countdownStartValue - i), // countdown
        take(countdownStartValue + 1), // limit the number of emitted events
        map(value => {
          const minutes: number = Math.floor(value / 60);
          const seconds: number = (value - minutes * 60);
          return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        })// limit the number of emitted events
      ).subscribe(value => this.countdown = value, error => console.log(error), () => this.bAvailableResendCode = true);
  }

  getUserPhoto = () => {
    let sPhoto_Return;
    if (this.oUser.sProfilePhoto) {
      sPhoto_Return = this.oUser.sProfilePhoto
    }else {
      sPhoto_Return = 'assets/img/humanPhotoMissing.jpeg'
    }
    return sPhoto_Return
  }

  onStartVerification = () => {
    this.oRouter.navigateByUrl('/terminal/verification')
  }

  onSignOut = () => {
    localStorage.clear();
    this.oRouter.navigateByUrl('/')
  }
}
