import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { CLUB_API, CLASS_API, CLASS_DETAIL_API, BOOKED_CLASS_USERS_API, PARTICIPANTS_EXPORT_API } from '../../../../constants/api-end-point';
import { Observable } from 'rxjs';

@Injectable()

export class ClassService {

  constructor(private _http: HttpService) { }

  getClub(query) {
    return this._http.get(CLUB_API, query);
  }

  getClassList(query) {
    return this._http.get(CLASS_API, query);
  }

  blockUnblockDeleteClass(query) {
    return this._http.delete(CLASS_API, query);
  }

  addClass(data) {
    return this._http.post(CLASS_API, data);
  }

  updateClass(data) {
    return this._http.put(CLASS_API, data);
  }

  getClassDetail(query) {
    return this._http.get(CLASS_DETAIL_API, query);
  }

  getBookedClassUsers(query) {
    return this._http.get(BOOKED_CLASS_USERS_API, query);
  }

  prepareBlobRequest(query?: any): Observable<Blob> {
    return this._http.getBlobRequest(PARTICIPANTS_EXPORT_API, query);
  }

}

