import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { CATEGORY_API, CATEGORY_DETAILS_API } from '../../../../constants/api-end-point';

@Injectable()
export class CategoryService {

  constructor(private _http: HttpService) { }

  getCategories(query: any) {
    return this._http.get(CATEGORY_API, query);
  }

  addCategory(body: any) {
    return this._http.post(CATEGORY_API, body);
  }

  updateCategory(body: any) {
    return this._http.put(CATEGORY_API, body);
  }

  blockUnblockDeleteCategory(query: any) {
    return this._http.delete(CATEGORY_API, query);
  }

  getCategoryDetails(query: any) {
    return this._http.get(CATEGORY_DETAILS_API, query);
  }

}
