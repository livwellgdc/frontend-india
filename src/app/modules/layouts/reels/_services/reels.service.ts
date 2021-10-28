import { Injectable } from '@angular/core';
import { REELS_API, REELS_DETAIL_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()
export class ReelsService {
  constructor(private _http: HttpService) { }

  public getReelsList(query) {
    return this._http.get(REELS_API, query);
  }

  public addReels(body) {
    return this._http.post(REELS_API, body);
  }

  public getReelsDetail(query) {
    return this._http.get(REELS_DETAIL_API, query);
  }

  public updateReels(body) {
    return this._http.put(REELS_API, body);
  }

  public deleteReels(query) {
    return this._http.delete(REELS_API, query);
  }
}
