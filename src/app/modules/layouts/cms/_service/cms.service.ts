import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { CMS_DETAIL_API, CMS_API } from '../../../../constants/api-end-point';

@Injectable()

export class CmsService {
  constructor(private _http: HttpService) { }

  getCmsContent(query: any) {
    return this._http.get(CMS_DETAIL_API, query);
  }

  editCmsContent(body: any) {
    return this._http.put(CMS_API, body);
  }

}
