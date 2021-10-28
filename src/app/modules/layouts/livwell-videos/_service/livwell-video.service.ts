import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { LIVWELL_VIDEO_API, LIVWELL_VIDEO_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()
export class LivwellVideoService {

  constructor(private _http: HttpService) { }

  getVideoList(query) {
    return this._http.get(LIVWELL_VIDEO_API, query);
  }

  addVideo(data) {
    return this._http.post(LIVWELL_VIDEO_API, data);
  }

  updateVideo(data) {
    return this._http.put(LIVWELL_VIDEO_API, data);
  }

  blockUnblockDeleteBanner(query) {
    return this._http.delete(LIVWELL_VIDEO_API, query);
  }

  getVideoDetail(query) {
    return this._http.get(LIVWELL_VIDEO_DETAIL_API, query);
  }

}
