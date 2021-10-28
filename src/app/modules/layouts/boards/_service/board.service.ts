import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { BOARD_API, BOARD_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()
export class BoardService {

  constructor(private _http: HttpService) { }

  getBoardList(query) {
    return this._http.get(BOARD_API, query);
  }

  addBoard(body) {
    return this._http.post(BOARD_API, body);
  }

  updateBoard(body) {
    return this._http.put(BOARD_API, body);
  }

  blockUnblockBoard(query) {
    return this._http.delete(BOARD_API, query);
  }

  getBoardDetail(query) {
    return this._http.get(BOARD_DETAIL_API, query);
  }

}
