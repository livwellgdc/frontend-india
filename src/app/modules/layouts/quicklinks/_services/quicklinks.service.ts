import { Injectable } from '@angular/core';
import { QUICKLINK_API, QUICKLINK_DETAIL_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()
export class QuicklinksService {

  constructor(private _http: HttpService) { }

  public getQuickLinkList(query) {
    return this._http.get(QUICKLINK_API, query);
  }

  public addQuickLink(body) {
    return this._http.post(QUICKLINK_API, body);
  }

  public getQuickLinkDetail(query) {
    return this._http.get(QUICKLINK_DETAIL_API, query);
  }

  public updateQuickLink(body) {
    return this._http.put(QUICKLINK_API, body);
  }

  public deleteQuickLink(query) {
    return this._http.delete(QUICKLINK_API, query);
  }
}
