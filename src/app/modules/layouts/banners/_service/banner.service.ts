import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { BANNER_API, BANNER_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()
export class BannerService {

  constructor(private _http: HttpService) { }

  getBannerList(query) {
    return this._http.get(BANNER_API, query);
  }

  addBanner(body) {
    return this._http.post(BANNER_API, body);
  }

  updateBanner(body) {
    return this._http.put(BANNER_API, body);
  }

  deleteBanner(query) {
    return this._http.delete(BANNER_API, query);
  }

  getBannerDetail(query) {
    return this._http.get(BANNER_DETAIL_API, query);
  }

}
