import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { BOARD_API, POST_API, POST_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()
export class PostService {

  constructor(private _http: HttpService) { }

  getBoardList(query?) {
    return this._http.get(BOARD_API, query);
  }

  getPostList(query) {
    return this._http.get(POST_API, query);
  }

  addPost(body) {
    return this._http.post(POST_API, body);
  }

  updatePost(body) {
    return this._http.put(POST_API, body);
  }

  deletePost(query) {
    return this._http.delete(POST_API, query);
  }

  getPostDetail(query) {
    return this._http.get(POST_DETAIL_API, query);
  }

}
