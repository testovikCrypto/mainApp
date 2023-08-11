import { io } from 'socket.io-client';
export class SocketClient {
  private socket: any;

  constructor() {
    let oUser: any = localStorage.getItem('currentUser');
    try {
      oUser = JSON.parse(oUser);
    } catch (e) {
      console.error(e)
    }
    if (oUser && oUser.id) {
      let sUserID = oUser.id;
      this.socket = io('https://startcryptotrade.com', {
        query: {
          userID: sUserID
        }
      });
    }
  }

  on(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
