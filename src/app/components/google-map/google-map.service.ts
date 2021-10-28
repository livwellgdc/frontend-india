import { Injectable } from '@angular/core';
import { ToastService } from '../toast-notification/toast.service';

@Injectable()

export class GoogleMapService {
  DEFAULT_LOCATION = [14.058324, 108.277199];

  constructor(
    private _toast: ToastService
  ) { }

  addressEncode(lat: any, long: any) {
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder;
      var latlng = { lat: +lat, lng: +long };
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === 'OK') {
          let formatAddress = this.addressFormatView(results[3] && results[3].formatted_address && results[3].formatted_address == 'Vietnam' ? results[3] : results[0]);
          resolve(formatAddress);
        } else {
          reject(false);
          this._toast.error('Geocoder failed');
        }
      })
    });
  }

  addressFormatView(place: any, elementValue?: any) {

    let formatAddress = {
      address: "",
      city: "",
      state: "",
      url: "",
      lat: null,
      long: null,
      googlePlace: null,
      coordinates: [], /*--long,lat----*/
    }
    formatAddress.googlePlace = place;
    formatAddress.coordinates[0] = place.geometry.location.lng();
    formatAddress.coordinates[1] = place.geometry.location.lat();
    formatAddress.lat = place.geometry.location.lat();
    formatAddress.long = place.geometry.location.lng();
    formatAddress.url = place.url;

    formatAddress.address = elementValue ? elementValue : place.formatted_address;

    if (place.address_components.length > 2) {
      formatAddress.city = place.address_components[0].long_name;/*--city--*/
      formatAddress.state = place.address_components[place.address_components.length - 2].long_name;/*--state--*/
    }
    return formatAddress;
  }

  public setCurrentPosition() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.addressEncode(position.coords.latitude, position.coords.longitude).then(address => {
            if (address) {
              resolve(address);
            }
          })
        }, (error: any) => {
          this.addressEncode(this.DEFAULT_LOCATION[0], this.DEFAULT_LOCATION[1]).then((address: {}) => {
            if (address) {
              let err = { errorCode: error.code, errorMessage: error.message, }
              reject({ ...err, ...address });
            }
          })
        });
      }
    })
  }

}
