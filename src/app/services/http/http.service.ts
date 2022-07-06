import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastService } from '../../components/toast-notification/toast.service';
import { environment } from '../../../environments/environment';
import { NO_INTERNET, INTERNAL_SERVER_ERROR } from '../../constants/messages';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient, private _toast: ToastService) { }

  post(url: string, body: any): Observable<any> {
    return this._http.post(environment.API_BASE_PATH + url, body)
      .pipe(map((data: any) => {
        return data.data;
      }), catchError((err: HttpErrorResponse) => this.handleError(err, true)));
  }

  get(url: string, parameter?: any): Observable<any> {
    return this._http.get(environment.API_BASE_PATH + url, { params: parameter })
      .pipe(map((data: any) => {
        return data.data;
      }), catchError((err: HttpErrorResponse) => this.handleError(err, true)));
  }

  patch(url: string, body?: any): Observable<any> {
    return this._http.patch(environment.API_BASE_PATH + url, body)
      .pipe(map((data: any) => {
        return data.data;
      }), catchError((err: HttpErrorResponse) => this.handleError(err, true)));
  }

  put(url: string, body?: any): Observable<any> {
    return this._http.put(environment.API_BASE_PATH + url, body)
      .pipe(map((data: any) => {
        return data.data;
      }), catchError((err: HttpErrorResponse) => this.handleError(err, true)));
  }

  delete(url: string, query?: any): Observable<any> {
    return this._http.delete(environment.API_BASE_PATH + url, { params: query })
      .pipe(map((data: any) => {
        return data.data;
      }), catchError((err: HttpErrorResponse) => this.handleError(err, true)));
  }

  getLocal(url: string): Observable<any> {
    return this._http.get(url).pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  getBlobRequest(url, queryParams?: any): Observable<Blob> {
    return this._http.get(environment.API_BASE_PATH + url, { params: queryParams, responseType: "blob" });
  }

  private handleError(err: HttpErrorResponse, toastView?: boolean) {
    /*--toast view by condition--*/
    if (toastView) {
      if (err.status == 0) {
        if (!navigator.onLine) {
          this._toast.error(NO_INTERNET);
        } else {
          this._toast.error(INTERNAL_SERVER_ERROR);
        }
      } else {
        if (err && err.message) {
          this._toast.error(err.message);
        }
      }
    }
    return throwError(err);
  }

}
