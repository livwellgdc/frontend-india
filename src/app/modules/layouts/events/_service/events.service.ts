import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { EVENT_API, EVENT_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()

export class EventsService {

  constructor(private _http: HttpService) { }

  getEventsList(query) {
    return this._http.get(EVENT_API, query);
  }

  addEvent(body) {
    return this._http.post(EVENT_API, body);
  }

  updateEvent(body) {
    return this._http.put(EVENT_API, body);
  }

  blockUnblockDeleteEvents(query) {
    return this._http.delete(EVENT_API, query);
  }

  getEventDetail(query) {
    return this._http.get(EVENT_DETAIL_API, query);
  }

}
