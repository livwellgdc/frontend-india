import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { VERSION_API, VERSION_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()
export class VersionService {

  constructor(private _http: HttpService) { }

  getVersions(query: any) {
    return this._http.get(VERSION_API, query);
  }

  addVersion(body: any) {
    return this._http.post(VERSION_API, body);
  }

  updateVersion(body: any) {
    return this._http.put(VERSION_API, body);
  }

  deleteVersion(query: any) {
    return this._http.delete(VERSION_API, query);
  }

  getVersionDetails(query: any) {
    return this._http.get(VERSION_DETAIL_API, query);
  }

}
