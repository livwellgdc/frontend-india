import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MFA_SEND_CODE_API, MFA_VALIDATE_CODE_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({ providedIn: 'root' })

export class SendCodeService {

    private baseUrlSendExpiryNotification: string = '/api/v1/account/sessionexpirynotification';
    private baseUrlSendTwoFactorCode: string = '/api/v1/account/sendtwofactorcode';
    private baseUrlValidateNotification: string = '/api/v1/account/validatetwofactor';

    constructor(private http: HttpClient, 
        private httpService: HttpService,
        private _storage: StorageService, 
        ) { }

    sendExpiryNotification() {
        let userId = localStorage.getItem('user_id');
        if (userId) {
            return this.http
                .post<any>(this.baseUrlSendExpiryNotification + `/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json', 'No-Auth': 'True',
                        // 'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN') 
                    }
                })
                .subscribe(
                    (result) => {
                        console.log(result);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }

    public sendTwoFactorProvider(body) {
        return this.httpService.post(MFA_SEND_CODE_API, body);
    }

    public validateTwoFactorCode(body) {
        return this.httpService.post(MFA_VALIDATE_CODE_API, body);
    }

    public sendCode() {
        const body = {
            userId: this._storage.adminId
        }
        return this.httpService.post(MFA_SEND_CODE_API, body);
      }
}
