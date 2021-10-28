import { Component, OnInit, ViewChild, ElementRef, Inject, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MapsAPILoader } from '@agm/core';
import { GoogleMapService } from './google-map.service';
import { ToastService } from '../toast-notification/toast.service';
import { MAP_LOCATION_ERROR } from '../../constants/messages';

declare const google: any;

@Component({
  selector: 'lv-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  public latitude: number = 0;
  public longitude: number = 0;
  public searchControl: FormControl;
  zoom: number = 3.5;

  @ViewChild('search', null) search: HTMLInputElement;
  selectObj = {
    address: "",
    city: "",
    state: "",
    url: "",
    googlePlace: null,
    coordinates: [], /*--long,lat----*/
    lat: null,
    long: null,
  }
  @ViewChild("search", null) public searchElementRef: ElementRef;

  constructor(
    private _dialog: MatDialogRef<GoogleMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _toast: ToastService,
    private _googleMap: GoogleMapService
  ) { }

  async ngOnInit() {
    this.searchControl = new FormControl();

    /*----------Change the default Zooming of Map----------*/
    this.zoom = 3.5;
    if (this.data.data.googlePlace && this.data.data.googlePlace.address_components) {
      this.resizeZoom(this.data.data.googlePlace.address_components, 1)
    } else if (!this.data.data.googlePlace && this.data.data.address) {
      if (this.data.data.address.length > 15) {
        this.zoom = 17;
      } else {
        this.zoom = 3.5;
      }
    }

    await this.waitGoogleMapLoad();/*--google map wait--*/
    if (this.data.data.coordinates.length > 0) {
      this.data.data.coordinates.reverse()
      this.data.data['lat'] = this.data.data.coordinates[0];
      this.data.data['long'] = this.data.data.coordinates[1];
      this.getAndSetLocationOfGoogleMap(this.data.data, true);
    } else {
      this.setCurrentPosition();
    }
    this.searchGetGooglePlace();
  }

  async waitGoogleMapLoad() {
    return this._mapsAPILoader.load().then(() => {
      return true
    }, (error) => {
      return false
    })
  }

  searchGetGooglePlace() {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
    autocomplete.addListener("place_changed", () => {
      this._ngZone.run(() => {
        let place = google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        /*----------Change the Zooming of Map----------*/
        this.resizeZoom(place.address_components)

        /*-------set address on object----------Make address view google map-----*/
        this.getAndSetLocationOfGoogleMap(this._googleMap.addressFormatView(place, this.searchElementRef.nativeElement.value));
      });
    });
  }

  private setCurrentPosition() {
    this._googleMap.setCurrentPosition().then(address => {
      this.getAndSetLocationOfGoogleMap(address);
    }, (error) => {
      this.getAndSetLocationOfGoogleMap(error);
    });
  }


  getAndSetLocationOfGoogleMap(address: any, inputFocus?: boolean) {
    if (address) {
      if (address.address.length > 20) {
        this.zoom = 17;
      } else {
        this.zoom = 3.5;
      }
      for (const key in address) {
        if (address.hasOwnProperty(key)) {
          this.selectObj[key] = address[key]
        }
      }
      this.latitude = address.lat;
      this.longitude = address.long;
      if (inputFocus) {
        this.searchElementRef.nativeElement.focus();
      }
      this.searchControl.setValue(this.selectObj.address);
    }

  }

  markerDragEnd(event: MouseEvent) {
    this._googleMap.addressEncode(event['coords'].lat, event['coords'].lng).then(address => {
      this.getAndSetLocationOfGoogleMap(address);
    })
  }

  submitAddress() {
    if (this.selectObj.coordinates.length == 0 || !this.selectObj.address) {
      this._toast.error(MAP_LOCATION_ERROR);
      return
    }
    this.selectObj['parentData'] = this.data;/*--return parent data---*/
    this.selectObj.coordinates = [this.selectObj.long, this.selectObj.lat];
    this._dialog.close(this.selectObj);/*--send--*/
  }

  resizeZoom(address: any, defaultCase?: number) {
    if (defaultCase == 1) {
      if (((address.length) - 1) > 3) {
        this.zoom = 17;
      } else {
        this.zoom = 4;
      }
    } else {
      if (address.length > 3) {
        this.zoom = address.length * 2.5;
      } else {
        this.zoom = 3.5;
      }
    }
  }

}
