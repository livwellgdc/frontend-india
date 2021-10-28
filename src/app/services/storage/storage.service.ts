import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ADMIN_INFO_API } from './../../constants/api-end-point';
import { ACCOUNT, DASHBOARD } from '../../constants/routes';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  adminDetail: any;

  constructor(private _router: Router, private _http: HttpService) { }

  get token() {
    return localStorage.getItem("session_tok") ? localStorage.getItem("session_tok") : localStorage.getItem("temp_tok");
  }

  get adminId() {
    return localStorage.getItem("_uid");
  }

  logOut() {
    localStorage.clear();
    setTimeout(() => {
      this.adminDetail = null;
    }, 1000); // this is used for avoid random reflection on side bar if logout
    this._router.navigate([ACCOUNT]);
  }

  getAdminDetail() {
    return new Promise((resolve, reject) => {
      if (this.adminDetail) {
        resolve(this.adminDetail);
      } else {
        this._http
          .get(ADMIN_INFO_API)
          .toPromise()
          .then(
            response => {
              this.updateAdminDetail(response.data);
              resolve(response.data);
            },
            error => {
              reject(error);
            }
          );
      }
    });
  }

  updateAdminDetail(data: any) {
    this.adminDetail = data;
  }

  public firstVerificationSuccess(response: any, email:string) {
    localStorage.setItem("temp_tok", response.data.accessToken);
    localStorage.setItem("email", email);
    localStorage.setItem("_uid", response.data.adminData.userId);
  }

  // public loginSuccessfully(response: any) {
  //   localStorage.setItem("session_tok", localStorage.getItem('temp_tok'));
  //   localStorage.removeItem('temp_tok');
  //   localStorage.removeItem('email');
  //   this._router.navigate([DASHBOARD]);
  // }

  public loginSuccessfully(response: any,) {
    localStorage.setItem("session_tok", response.data.accessToken);
    localStorage.removeItem('temp_tok');
    localStorage.removeItem('email');
    this._router.navigate([DASHBOARD]);
  }

  deviceDetail(info?: number) {
    /*---1=device_token, 2=deviceId, 3=platform---*/
    switch (info) {
      case 1:
        return "123";
      case 2:
        let deviceId = this.randomDeviceId();
        return deviceId;
      case 3:
        return "3";
      case 4:
        return this.getTimeZone();
    }
  }

  randomDeviceId() {
    return (window.navigator.userAgent.replace(/\D+/g, ''));
  }

  // randomDeviceId(length) {
  //   let result = "";
  //   let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  getTimeZone() {
    let date = new Date();
    let offset = date.getTimezoneOffset() * -1;
    return offset * 60 * 1000;
  }

}
