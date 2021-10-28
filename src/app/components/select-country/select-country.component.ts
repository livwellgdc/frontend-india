import { CountryService } from './country.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DEFAULT_COUNTRY_CODE } from '../../constants/messages';

@Component({
  selector: 'lv-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss'],
  providers: [CountryService]
})
export class SelectCountryComponent implements OnInit {
  countries: any;
  searchCountry: any;
  @Input() control: FormControl = new FormControl();

  constructor(private _country: CountryService) { }

  ngOnInit() {
    if (!this.control.value) {
      this.control.setValue(DEFAULT_COUNTRY_CODE); /* SET DEFAULT COUNTRY CODE */
    }
    this.getCountriesWithCode();
  }

  getCountriesWithCode() {
    this.countries = this._country.getCountriesAndCodes().then((response => {
      this.countries = response;
      this.searchCountry = response;
    }));
  }

  searchCountries(searchKeyword) {
    this.searchCountry = this.countries.filter((country) => {
      if (country.name.toLowerCase().startsWith(searchKeyword.toLowerCase())) {
        return country;
      }
    });
  }

}
