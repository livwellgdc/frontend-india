import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { LoaderService } from '../../components/loader/loader.service';
import { environment } from './../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { ToastService } from '../../components/toast-notification/toast.service';
import { TIME_OUT, NO_INTERNET, SOMETHING_WRONG } from '../../constants/messages';
import { CLASS_IMPORT_API, SAMPLE_EXPORT_API } from '../../constants/api-end-point';

@Injectable()

export class ImportExportService {

  constructor(
    private _ls: LoaderService,
    private _storage: StorageService,
    private _toast: ToastService,
    private _http: HttpService
  ) { }

  prepareBlobRequest(query?: any): Observable<Blob> {
    return this._http.getBlobRequest(SAMPLE_EXPORT_API, query);
  }

  importFiles(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(false);
        return
      }
      this._ls.show();
      var formData = new FormData();
      formData.append("file", file, file.name);
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", environment.API_BASE_PATH + CLASS_IMPORT_API, true);
      xhttp.timeout = 30000;
      xhttp.setRequestHeader("Authorization", 'Bearer ' + this._storage.token);
      xhttp.setRequestHeader("api_key", environment.API_KEY);
      xhttp.setRequestHeader("platform", '' + this._storage.deviceDetail(3));
      xhttp.setRequestHeader("timezone", '' + this._storage.deviceDetail(4));
      xhttp.setRequestHeader("language", 'en');
      xhttp.send(formData);
      xhttp.onload = (e: any) => {

        const upload = JSON.parse(e.target.response);
        if (upload.statusCode === 200) {
          resolve(upload);
        } else {
          reject(upload.message);
        }
        this._ls.hide();
      };

      xhttp.ontimeout = (e: any) => {
        this._ls.hide();
        this._toast.error(TIME_OUT);
        reject(false);
      }
      xhttp.onerror = (e: any) => {
        this._ls.hide();
        reject(false);
        if (!navigator.onLine) {
          this._toast.error(NO_INTERNET);
        } else {
          this._toast.error(SOMETHING_WRONG);
        }
      }
    });
  }
}
