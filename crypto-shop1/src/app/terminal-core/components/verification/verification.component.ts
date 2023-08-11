import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {TerminalComponent} from "../../../pages/components/terminal/terminal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  public bIsInSubmittingVerificationProcess: boolean = false;
  public sVerificationConfirmed: string = 'false';

  constructor(private oAuthService: AuthService,
              private oTerminalComponent: TerminalComponent,
              private oRouter: Router) {
    let oCurrentUser: any = {};
    let localStorageUser: any = '';
    if (localStorage.getItem('currentUser')) {
      localStorageUser = localStorage.getItem('currentUser');
    }
    // if (localStorage.getItem('currentUser') && typeof localStorage.getItem('currentUser') === 'string') {
    try {
      oCurrentUser = localStorageUser ? JSON.parse(localStorageUser) : localStorageUser
    } catch (e) {
      console.error(e)
    }
    // }
    if (oCurrentUser && oCurrentUser.id) {
      this.oAuthService.getUser(oCurrentUser.id).subscribe(
        (data) => {
          this.sVerificationConfirmed = data.sVerificationConfirmed;
        },
        (error) => {
          console.error('Ошибка получения данных пользователя', error);
        }
      );
    }
  }

  public fileInput_1;
  public fileInput_2;
  public fileInput_3;
  public fileInput_4;
  public fileInput_5;
  public fileInput_6;
  public fileInput_7;
  public fileInput_8;
  public fileInput_9;


  onChangeField(event, sKey_Input) {
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
          this[sKey_Input] = canvas.toDataURL('image/jpeg', 0.8);
        };
      };
    }
  }


  isAllFieldsFilledPassport = () => {
    return !!this.fileInput_1 && !!this.fileInput_2 && !!this.fileInput_3 && this.fileInput_4 && this.fileInput_5
  }

  isAllFieldsFilledDrivingLicense = () => {
    return !!this.fileInput_6 && !!this.fileInput_7 && !!this.fileInput_8 && this.fileInput_9
  }

  onSubmitVerification_ByDrivingLicense = () => {
    if (this.isAllFieldsFilledDrivingLicense()) {
      let oUser: any = localStorage.getItem('currentUser');
      try {
        oUser = JSON.parse(oUser);
      } catch (e) {
        console.error(e)
      }
      let sUserID = oUser.id;
      let oDocumentsList = {
        sData_DrivingLicense_FrontSide: this.fileInput_6,
        sData_DrivingLicense_BackSide: this.fileInput_7,
        sData_DrivingLicense_Selfie: this.fileInput_8,
        sData_DrivingLicense_SelfieWithLicense: this.fileInput_9,
      }
      this.oAuthService.onVerification(sUserID, oDocumentsList).subscribe((oRes: any) => {
        // this.oTerminalComponent.onUpdateUser();
        this.oRouter.navigateByUrl('/terminal/profile')
      })
    }
  }

  public createObjectUrl = (arrayBuffer) => {
    let blob = new Blob([arrayBuffer], {type: 'image/png'});
    return URL.createObjectURL(blob);
  }

  onSubmitVerification_ByPassport = () => {
    this.bIsInSubmittingVerificationProcess = true;
    if (this.isAllFieldsFilledPassport()) {
      let oUser: any = localStorage.getItem('currentUser');
      try {
        oUser = JSON.parse(oUser);
      } catch (e) {
        console.error(e)
      }
      let sUserID = oUser.id;
      let oDocumentsList = {
        sData_Passport_FirstPage: this.fileInput_1,
        sData_Passport_SecondPage: this.fileInput_2,
        sData_Passport_ResidencePermit: this.fileInput_3,
        sData_Passport_Selfie: this.fileInput_4,
        sData_Passport_SelfieWithPassport: this.fileInput_5,
      }
      this.oAuthService.onVerification(sUserID, oDocumentsList).subscribe((oRes: any) => {
        this.oTerminalComponent.onUpdateUser();
        this.oRouter.navigateByUrl('/terminal/profile')
      })
    }
  }
}
