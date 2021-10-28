import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { LOCAL_COUNTRY_WITH_CODE } from '../../constants/api-end-point';
import { first } from 'rxjs/operators';

@Injectable()

export class CountryService {
  countryWithCodeList: any;

  constructor(private _http: HttpService) { }

  getCountriesAndCodes() {
    return new Promise((resolve, reject) => {
      if (this.countryWithCodeList) {
        resolve(this.countryWithCodeList);
      } else {
        return this._http.getLocal(LOCAL_COUNTRY_WITH_CODE).pipe(first()).subscribe(response => {
          this.countryWithCodeList = response;
          return resolve(this.countryWithCodeList)
        }, (error) => {
          reject(error);
        })
      }
    })
  }

}
