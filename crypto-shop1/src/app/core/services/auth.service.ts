import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from "@angular/router";
import {TradesService} from "./trades.service";
import {SocketClient} from "../../../socketClient";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private socketClient: SocketClient;
  private oObservable_User = new BehaviorSubject<any>({});

  constructor(private oRouter: Router,
              private oHttpClient: HttpClient,
              private oTradesService: TradesService,
              private socketClient: SocketClient
  ) {

    if (this.isLoggedIn()) {
      let oUser: any = localStorage.getItem('currentUser');
      try {
        oUser = JSON.parse(oUser);
      } catch (e) {
        console.error(e)
      }
      const sID_User = oUser.id;
      this.socketClient.on('withdraw_Success', (data) => {
        this.socketClient.emit('userUpdate', {
          sID_User: sID_User,
          sKey_Param: 'getUser'
        })
      })

      this.socketClient.on('withdraw_Failed', (data) => {
        if (data && data.message) {
          console.error('[withdraw_Failed], error:', data.message)
        }
      })

      this.socketClient.on('replenish_Success', (data) => {
        this.socketClient.emit('userUpdate', {
          sID_User: sID_User,
          sKey_Param: 'getUser'
        })
      })

      this.socketClient.on('replenish_Failed', (data) => {
        if (data && data.message) {
          console.error('[replenish_Failed], error:', data.message)
        }
      })

      this.socketClient.on('userUpdated', (oUser) => {
        console.log('[userUpdated],', oUser)
        this.oObservable_User.next(oUser);
      });
    }
  }

  onUpdateOrGetUser = (oParams?) => {
    let oUser: any = localStorage.getItem('currentUser');
    try {
      oUser = JSON.parse(oUser);
    } catch (e) {
      console.error(e)
    }
    const sID_User = oUser.id;

    if (!oParams) {
      console.log('[onUpdateOrGetUser], emit!!!')
      this.socketClient.emit('userUpdate', {
        sID_User: sID_User,
        sKey_Param: 'getUser'
      })
    }
  }

  isLoggedIn = () => {
    return localStorage.getItem('token') && localStorage.getItem('currentUser');
  }

  sendConfirmationEmail = (sEmail) => {
    return this.oHttpClient.post(`https://startcryptotrade.com/api/auth/confirmEmail`,
      {sClientEmail: sEmail});
  }

  getActualUser(): Observable<any> {
    return this.oObservable_User;
  }

  getUser(id: string): Observable<any> {
    return this.oHttpClient.get(`https://startcryptotrade.com/api/auth/user/${id}`);
  }

  register(sName: string, sSurname: string, sEmail: string, sNumber: string, sPassword: string) {
    return this.oHttpClient.post('https://startcryptotrade.com/api/auth/register', {
      sName
      , sSurname
      , sEmail
      , sNumber
      , sPassword
      , sDateTime_Registered: new Date()
    })
    // this.socketClient.register(sName, sSurname, sEmail, sNumber, sPassword);
  }

  login(sEmail: string, sPassword: string) {
    // this.socketClient.login(sEmail, sPassword);
    return this.oHttpClient.post('https://startcryptotrade.com/api/auth/login', {sEmail, sPassword})
  }

  logout() {
    // this.socketClient.logout();
  }

  onToggleUserDemoAccount(sID_User: string, bDemoAccount: boolean) {
    return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/user/${sID_User}/demo`, {bDemoAccount});
  }

  onChangeProfilePhoto(sID_User: string, sBasePhoto: string) {
    function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    }

    const formData: FormData = new FormData();
    const blob = dataURLtoBlob(sBasePhoto);
    formData.append('documents', blob, 'photo');

    return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/user/${sID_User}/photo`, formData);
  }

  onVerification(sID_User: string, oVerificationDocuments) {
    function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    }

    const formData: FormData = new FormData();

    Object.entries(oVerificationDocuments).forEach(([key, value]) => {
      const blob = dataURLtoBlob(value);
      formData.append('documents', blob, key);
    });
    return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/user/${sID_User}/verification`, formData);
  }

  onSubmitWithdraw = (sID_User: string, nAmountToWithdraw: number, sWallet: string) => {
    this.socketClient.emit('onWithdraw', {sID_User, nAmountToWithdraw, sWallet, sDateTime: new Date()})
  }

  onSubmitReplenish = (sID_User, nAmountToReplenish) => {
    this.socketClient.emit('onReplenish', {sID_User, nAmountToReplenish, sDateTime: new Date()})
  }

  getGatewayReplenishWalletsFiltered = () => {
    return this.oHttpClient.get('https://startcryptotrade.com/api/auth/getGatewayReplenishWalletsFiltered')
  }

  getActualReplenishWallets = () => {
    return this.oHttpClient.get('https://startcryptotrade.com/api/auth/actualReplenishWallets')
  }
}
