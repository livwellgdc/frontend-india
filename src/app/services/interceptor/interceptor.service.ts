import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { map, catchError, finalize, timeout } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { ToastService } from '../../components/toast-notification/toast.service';
import { LoaderService } from '../../components/loader/loader.service';
import { NO_INTERNET, INTERNAL_SERVER_ERROR } from '../../constants/messages';
import { retryWithBackOff } from '../../customRxJsOperators/retryApiWithBackOff';
import * as CryptoJS from 'crypto-js';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  constructor(
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
    private _auth: AuthService,
    private _toast: ToastService,
    private _ls: LoaderService,
    private _store: StorageService,
    private _router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = Number(req.headers.get('timeout')) || this.defaultTimeout;

    let authReq = req.clone({ setHeaders: this._auth.authorization() });

    if (authReq.body !== null) {
      let encrypted = this.encrypt(authReq.body);
      authReq = req.clone({
        body: { 'data': encrypted },
        ...{ setHeaders: this._auth.authorization() }
      })
    }

    if ((req.url.split('/')[7] != 'dashboard') && (req.url.split('/')[7] != 'dropdown')) {
      this._ls.show();
    }

    return next.handle(authReq).pipe(retryWithBackOff(), timeout(timeoutValue), map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this._ls.hide();
        if (event.body && event.body.data) {
          let decipher = this.decrypt(event.body.data);
          return event.clone({ body: { data: JSON.parse(decipher.toString(CryptoJS.enc.Utf8)) } });
        } else {
          return event;
        }
      }
    }), catchError((error: HttpErrorResponse) => {
      if (error.error && error.error.data) {
        let decipher1 = this.decrypt(error.error.data)
        let formatData1 = JSON.parse(decipher1.toString(CryptoJS.enc.Utf8)) ;
        // doube time decrypt the data
        let decipher = this.decrypt(formatData1.data)
        let formatData = { body: { data: JSON.parse(decipher.toString(CryptoJS.enc.Utf8)) } };
        this.errorState(error, formatData.body.data);
        return throwError(formatData.body.data);
      } else {
        this.errorState(error);
        return throwError(error);
      }
    }),
      finalize(() => {
        this._ls.hide();
      })
    );
  }

  errorState(error: any, data?: any) {
    this._ls.hide();
    if (error.status == 0) {
      if (!navigator.onLine) {
        this._toast.error(NO_INTERNET);
      } else {
        this._toast.error(INTERNAL_SERVER_ERROR);
      }
    } else if (error.status == 401) {
      this._toast.error(data ? data.message : error.message);
      this._store.logOut();
    } else if (error.status == 404) {
      this._toast.error(data ? data.message : error.message);
      this._router.navigate(['404']);
    } else {
      this._toast.error(data ? data.message : error.message);
    }
  }

  encrypt(data) {
    //1029384756$#@$^@1ERF
    let key = CryptoJS.enc.Utf8.parse("102938$#@$^@1ERF");
    let iv = CryptoJS.enc.Utf8.parse("102938$#@$^@1ERF");
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }).toString();
    return encrypted;
  }

  decrypt(data) {
    let key = CryptoJS.enc.Utf8.parse("102938$#@$^@1ERF");
    let iv = CryptoJS.enc.Utf8.parse("102938$#@$^@1ERF");
    let decipher = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    return decipher;
  }

}
