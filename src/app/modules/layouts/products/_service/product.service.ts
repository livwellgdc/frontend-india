import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { PRODUCT_API, PRODUCT_DETAIL_API} from '../../../../constants/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpService) { }

  getProductList(query) {
    return this._http.get(PRODUCT_API, query);
  }

  addProduct(body) {
    return this._http.post(PRODUCT_API, body);
  }
  getProductDetail(query) {
    return this._http.get(PRODUCT_DETAIL_API, query);
  }
  updateProduct(body) {
    return this._http.put(PRODUCT_API, body);
  }
  blockUnblockDeleteProdct(query) {
    return this._http.delete(PRODUCT_API, query);
  }
}
