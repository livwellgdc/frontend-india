import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { UN_AUTH_CMS_DETAIL_API } from '../../../constants/api-end-point';

@Injectable()
export class UnAuthCmsService {

  constructor(private _http: HttpService) { }

  getCmsContent(query: any) {
    return this._http.get(UN_AUTH_CMS_DETAIL_API, query);
  }
}
