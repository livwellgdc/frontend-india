import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClubService } from '../../_service/club.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BC_CLUBS_EDIT, BC_CLUBS_ADD } from '../../../../../constants/breadcrumb-routes';
import { CLUB_ERROR_MESSAGES, DATA_NOT_FOUND } from '../../../../../constants/messages';
import { CLUBS } from '../../../../../constants/routes';
import { Location } from '@angular/common';
import { splitAt, toUpperCase } from '../../../../../constants/helper';
import { GoogleMapComponent } from '../../../../../components/google-map/google-map.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'lv-add-edit-clubs',
  templateUrl: './add-edit-clubs.component.html',
  styleUrls: ['./add-edit-clubs.component.scss'],
  providers: [ClubService]
})
export class AddEditClubsComponent implements OnInit, OnDestroy {

  clubForm: FormGroup;
  _limit = LIMIT;
  errMsg = CLUB_ERROR_MESSAGES;
  clubId: string;
  clubDetails: Club.ClubData;
  clientClubs = [];
  cityList = [];
  searchedCity = [];

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _toast: ToastService,
    public _common: CommonService,
    private _club: ClubService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.clubId = this._actRoute.snapshot.params['clubId'];
    this.createForm();
    this.getClientClubs();
    this.getCities();
    if (this.clubId) {
      this._bc.setBreadcrumb(BC_CLUBS_EDIT);
      if (this._common.isValidId(this.clubId)) {
        this.getClubDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_CLUBS_ADD);
    }
  }

  createForm() {
    this.clubForm = this._fb.group({
      name: [''],
      shortName: ['', [Validators.pattern(REGEX.ONLY_ALPHABET)]],
      cityName: [''],
      qrCode: [''],
      clientId: this._fb.group({
        _id: [''],
        name: ['']
      }),
      mobileNo: ['', [Validators.pattern(REGEX.AMOUNT)]],
      // optionalAddress: [''],
      address: [''],
      coordinates: [[]],
    })
  }

  get f() { return this.clubForm.controls }; //return form controls

  getClubDetails() {
    this._club.getClubDetail({ clubId: this.clubId }).subscribe((res: Club.ClubDetail) => {
      if (res.statusCode == 200) {
        this.clubDetails = res.data;
        this.clubForm.patchValue(this.clubDetails);
        if (this.clubDetails.location && this.clubDetails.location.address) {
          this.f.address.setValue(this.clubDetails.location.address);
          this.f.coordinates.setValue(this.clubDetails.location.coordinates);
        }
      }
    })
  }

  setQrCode() {
    this.trimValues();
    if (this.f.shortName.valid && this.f.mobileNo.valid) {
      let mobileLength = String(this.f.mobileNo.value).split('').length;
      let spiltedValue = splitAt(mobileLength - 3)(String(this.f.mobileNo.value))[1];
      let qrCode = `${String(this.f.shortName.value).toUpperCase()}${spiltedValue}`;
      this.f.qrCode.setValue(qrCode);
    }
    this.removeWhiteSpace();
  }

  getClientClubs() {
    this._club.getClientClubs().subscribe(res => {
      this._common.isApiCallInProgress.ofClub = false;
      this.clientClubs = res.data;
    }, () => {
      this._common.isApiCallInProgress.ofClub = false;
      this.clientClubs = [];
    })
  }

  clientClubSelectionHandler(clientId: string) {
    for (let find = 0; find < this.clientClubs.length; find++) {
      if (clientId == this.clientClubs[find]._id) {
        this.f.clientId.patchValue(this.clientClubs[find]);
        break;
      }
    }
  }

  getCities() {
    this._common.getCities().then((res: []) => {
      this._common.isApiCallInProgress.ofCity = false;
      this.cityList = res;
      this.searchedCity = res;
    }, () => {
      this._common.isApiCallInProgress.ofCity = false;
    })
  }

  searchCityByName(searchKey) {
    this.searchedCity = this.cityList.filter((city) => {
      if (city.name.toLowerCase().startsWith(searchKey.toLowerCase())) {
        return city;
      }
    });
  }

  removeWhiteSpace() {
    if (this.f.mobileNo.value) {
      this.f.mobileNo.setValue(String(this.f.mobileNo.value).replace(/\s/g, ''));
    }
  }

  openGoogleMap() {
    const dialogRef = this._dialog.open(GoogleMapComponent, {
      width: "400px",
      data: { data: this.clubForm.value }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.lat) {
          delete result.lat;
        }
        if (result.long) {
          delete result.long;
        }
        if (result.parentData) {
          this.f.address.setValue(result.address);
          this.f.coordinates.setValue(result.coordinates);
          this.f.address.markAsDirty();
        } else {
          this._toast.error(DATA_NOT_FOUND);
        }
      }
    });
  }

  clubHandler() {
    this.checkValidation();

    if (this.clubForm.valid) {
      let formValue = this.objectFormation();

      if (this.clubId) {
        if (this.clubForm.dirty) {
          this.updateClub(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewClub(formValue);
      }
    }
  }

  objectFormation() {
    let formValue = this.clubForm.value;

    formValue.name = toUpperCase(formValue.name);
    formValue.shortName = toUpperCase(formValue.shortName);
    // delete formValue['optionalAddress'];

    let formatLocation = {};
    if (formValue.address) {
      formatLocation = {
        location: {
          address: formValue.address,
          coordinates: formValue.coordinates
        }
      }
    }
    delete formValue.address;
    delete formValue.coordinates;

    return { ...formValue, ...formatLocation }; //merge two objects
  }

  addNewClub(formValue: any) {
    this._club.addClub(formValue).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateClub(formValue: any) {
    formValue['clubId'] = this.clubId;
    this._club.updateClub(formValue).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {
    this.f.address.setValidators([Validators.required]);
    this.setQrCode();
  }

  trimValues() {
    for (const key in this.clubForm.value) {
      if (this.clubForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }
  }

  cancelHandler() {
    this._loc.back();
  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([CLUBS]);
  }

  ngOnDestroy() {
    this._common.isApiCallInProgress.ofCity = true;
    this._common.isApiCallInProgress.ofClub = true;
  }

}
