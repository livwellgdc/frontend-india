import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { CorporateService } from '../../_service/corporate.service';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CORPORATE_ERROR_MESSAGES, POINTS_DISTRIBUTION_FREQUENCY, DATA_NOT_FOUND, COMPANY_TYPE, INVALID_DATE_TIME_ERROR, EMPLOYEE_RANGE, ALL_INDUSTRIES, CORPORATE_CREATED_MSG } from '../../../../../constants/messages';
import { GoogleMapComponent } from '../../../../../components/google-map/google-map.component';
import { MatDialog } from '@angular/material';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CORPORATES } from '../../../../../constants/routes';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_CORPORATES_ADD, BC_CORPORATES_EDIT } from '../../../../../constants/breadcrumb-routes';
import { Pagination } from '../../../../../constants/paginator';
import { dateToMs, isDuplicate } from '../../../../../constants/helper';
import { SuccessPopupService } from '../../../../../components/success-popup/success-popup.service';

@Component({
  selector: 'lv-add-edit-corporate',
  templateUrl: './add-edit-corporate.component.html',
  styleUrls: ['./add-edit-corporate.component.scss'],
  providers: [S3BucketService, CorporateService]
})
export class AddEditCorporateComponent extends Pagination implements OnInit {
  corporateForm: FormGroup;
  corporateId: string;
  corporateDetails: Corporate.CorporateData;
  cropFile: any;
  _limit = LIMIT;
  errMsg = { ...CORPORATE_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  staticArrays = {
    frequencies: [],
    companyTypes: [],
    employeeRanges: [],
    industries: [],
    searchedIndustries: [],
    cityList: [],
    searchedCity: []
  }
  @ViewChild('coinsDistribution', { static: true }) coinsDistribution: ElementRef;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _dialog: MatDialog,
    private _toast: ToastService,
    private _router: Router,
    private _loc: Location,
    private _s3: S3BucketService,
    private _corporate: CorporateService,
    private _actRoute: ActivatedRoute,
    private _common: CommonService,
    private _success: SuccessPopupService
  ) { super() }

  ngOnInit() {
    this.setArraysInformation();
    this.corporateId = this._actRoute.snapshot.params['corporateId'];
    this.createForm();
    this.getCities();
    if (this.corporateId) {
      this._bc.setBreadcrumb(BC_CORPORATES_EDIT);
      if (this._common.isValidId(this.corporateId)) {
        this.getCorporateDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_CORPORATES_ADD);
      this.addDomain();
    }
  }

  setArraysInformation() {
    this.staticArrays.frequencies = POINTS_DISTRIBUTION_FREQUENCY;
    this.staticArrays.companyTypes = COMPANY_TYPE;
    this.staticArrays.employeeRanges = EMPLOYEE_RANGE;
    this.staticArrays.industries = ALL_INDUSTRIES;
    this.staticArrays.searchedIndustries = ALL_INDUSTRIES;
  }

  createForm() {
    this.corporateForm = this._fb.group({
      logo: [''],
      name: [''],
      adminName: [''],
      adminEmail: ['', [Validators.pattern(REGEX.EMAIL)]],
      countryCode: [''],
      mobileNo: ['', [Validators.pattern(REGEX.AMOUNT)]],
      taxCode: [''],
      categoryName: [''],
      companyType: [''],
      noOfEmployees: [''],
      industry: [''],
      startDate: [],
      endDate: [],
      points: [, [Validators.pattern(REGEX.AMOUNT)]],
      allMembers: [],
      frequencyType: [''],
      cityName: [''],
      address: [''],
      coordinates: [[]],
      domains: this._fb.array([]),
      otherAddresses: this._fb.array([]),
      description: this._fb.group({
        en: [''],
        vi: ['']
      }),
    })
  }

  get f() { return this.corporateForm.controls } //retrun form controls

  private _createMultipleDomain(data?: any): FormGroup {
    return this._fb.group({
      isDisableField: [data ? data.isDisableField : false],
      domain: [data ? data.domain : ""],
    });
  }

  private _createLocation(data?: any): FormGroup {
    return this._fb.group({
      // isDisableField: [data ? data.isDisableField : false],
      address: [data ? data.address : ""],
      coordinates: [data ? data.coordinates : []]
    });
  }

  get locations() {
    return this.corporateForm.get("otherAddresses") as FormArray;
  }

  locationByIndex(index: number) {
    const byIndex = this.corporateForm.get("otherAddresses") as FormArray;
    return byIndex.controls[index];
  }

  locationByIndexSubControls(index: number, ctr: any) {
    const byIndex = this.corporateForm.get("otherAddresses") as FormArray;
    return byIndex.controls[index]["controls"][ctr];
  }

  addLocation(data?: any) {
    this.locations.push(this._createLocation(data));
    this.locations.markAsDirty();
  }

  removeLocation(controlValue, index) {
    if (!controlValue.isDisableField) {
      this.locations.removeAt(index);
      this.locations.markAsDirty();
    }
  }

  get domains() {
    return this.corporateForm.get("domains") as FormArray;
  }

  addDomain(data?: any) {
    this.domains.push(this._createMultipleDomain(data));
    this.domains.markAsDirty();
  }

  removeDomain(controlValue, index) {
    if (!controlValue.isDisableField) {
      this.domains.removeAt(index);
      this.domains.markAsDirty();
    }
  }

  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 5 / 5.0001, inputWidth: 300 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.logo.setErrors(null);
        this.f.logo.markAsDirty();
      }
    });
  }

  setRegisterLocation() {
    this.openGoogleMap();
  }

  openGoogleMap(isObj?) {
    const dialogRef = this._dialog.open(GoogleMapComponent, {
      width: "400px",
      data: isObj ? isObj : { data: this.corporateForm.value }
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
          if (isObj) {
            this.locationByIndex(result.parentData.index).patchValue(result);
          } else {
            this.f.address.markAsDirty();
            this.corporateForm.patchValue(result);
          }
        } else {
          this._toast.error(DATA_NOT_FOUND);
        }
      }
    });
  }

  addMoreLocGoogleMap(controlValue, index: number) {
    if (!controlValue.isDisableField) {
      const obj = { index: index, data: this.corporateForm.controls.otherAddresses["controls"][index].value };
      this.openGoogleMap(obj);
    }
  }

  startDateChange() {
    this.f.endDate.setValue(null);
  }

  searchIndustryByName(searchKey) {
    this.staticArrays.searchedIndustries = this.staticArrays.industries.filter((industry) => {
      if (industry.name.toLowerCase().startsWith(searchKey.toLowerCase())) {
        return industry
      }
    });
  }

  getCities() {
    this._common.getCities().then((res: []) => {
      this.staticArrays.cityList = res;
      this.staticArrays.searchedCity = res;
    })
  }

  searchCityByName(searchKey) {
    this.staticArrays.searchedCity = this.staticArrays.cityList.filter((city) => {
      if (city.name.toLowerCase().startsWith(searchKey.toLowerCase())) {
        return city
      }
    });
  }

  getCorporateDetails() {
    this._corporate.getCorporateDetail({ corporateId: this.corporateId }).subscribe((res: Corporate.CorporateDetail) => {
      if (res.statusCode == 200) {
        this.corporateDetails = res.data;

        if (this.corporateDetails.logo) {
          this.cropFile = {
            cropBase64: this.corporateDetails.logo,
            cropFile: this.corporateDetails.logo
          }
        }
        this.corporateDetails.countryCode = `+${this.corporateDetails.countryCode}`;
        this.corporateForm.patchValue(this.corporateDetails);
        if (this.corporateDetails.registeredAddress && this.corporateDetails.registeredAddress.address) {
          this.f.address.setValue(this.corporateDetails.registeredAddress.address);
          this.f.coordinates.setValue(this.corporateDetails.registeredAddress.coordinates);
        }
        this.f.startDate.setValue(new Date(this.corporateDetails.startDate));
        this.f.endDate.setValue(new Date(this.corporateDetails.endDate));
        if (this.corporateDetails.otherAddresses && this.corporateDetails.otherAddresses.length > 0) {
          this.corporateDetails.otherAddresses.forEach(address => {
            // address['isDisableField'] = true;
            this.addLocation(address);
          });
        }
        let tempDomainArray = [];
        this.corporateDetails.domains.forEach((domain, index) => {
          tempDomainArray.push({ isDisableField: true, domain: domain });
          this.addDomain(tempDomainArray[index]);
        });

        //disabled location box
        // if (this.locations.controls.length > 0) {
        //   this.locations.controls.forEach(control => {
        //     if (control.value.isDisableField) {
        //       control.disable();
        //     }
        //   });
        // }

        //disabled domain box
        if (this.domains.controls.length > 0) {
          this.domains.controls.forEach(control => {
            if (control.value.isDisableField) {
              control.disable();
            }
          });
        }

      }
    })
  }

  async corporateHandler() {
    this.checkValidation();
    if (this.corporateForm.valid) {
      let formValue = this.corporateForm.value;
      formValue.countryCode = String(formValue.countryCode).slice(1);
      formValue.startDate = dateToMs(formValue.startDate);
      formValue.endDate = dateToMs(formValue.endDate, true);
      formValue.points = Number(formValue.points);
      formValue.allMembers = Number(formValue.allMembers);

      let formatLocation = {};
      if (formValue.address) {
        formatLocation = {
          registeredAddress: {
            address: formValue.address,
            coordinates: formValue.coordinates
          }
        }
      }
      delete formValue.address;
      delete formValue.coordinates;

      let finalFormBody = { ...formValue, ...formatLocation }; //merge two objects

      if (formValue.allMembers > formValue.points) {
        this.coinsDistribution.nativeElement.focus();
        this._toast.error(this.errMsg.DISTRIBUTION_POINT_ERROR);
        return
      }

      if (finalFormBody.otherAddresses.length == 0) {
        delete finalFormBody.otherAddresses;
      } else {
        if (finalFormBody.otherAddresses.map(el => el.address).includes(finalFormBody.registeredAddress.address)) {
          this._toast.error(this.errMsg.DUPLICATE_LOCATION);
          return
        }
        if (isDuplicate(finalFormBody.otherAddresses.map(el => el.address))) {
          this._toast.error(this.errMsg.DUPLICATE_LOCATION);
          return
        }
        // finalFormBody.otherAddresses.forEach(element => {
        //   delete element['isDisableField'];
        // });
      }

      if (isDuplicate(finalFormBody.domains.map(el => el.domain))) {
        this._toast.error(this.errMsg.DUPLICATE_CORPORATE_DOMAIN);
        return
      } else {
        finalFormBody.domains = finalFormBody.domains.map(el => el.domain);
      }

      if (this.cropFile && this.f.logo.dirty) {
        await this.uploadImage(finalFormBody);
      }

      if (this.corporateId) {
        if (this.corporateForm.dirty) {
          this.updateCorporate(finalFormBody);
        } else {
          this.navigate();
        }
      } else {
        this.addNewCorporate(finalFormBody);
      }
    }
  }

  uploadImage(formValue) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.cropFile.cropFile).then((response: any) => {
        if (response && response.Location) {
          formValue.logo = response.Location;
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  addNewCorporate(formBody: any) {
    this._corporate.addCorporate(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this._success.successBox('Check Your Inbox', CORPORATE_CREATED_MSG, CORPORATES);
      }
    })
  }

  updateCorporate(formBody: any) {
    formBody['corporateId'] = this.corporateId;
    this._corporate.updateCorporate(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {
    this.trimValues();

    /**
    * Retrieve disabled controls values
    */
    this.corporateForm.value["otherAddresses"] = this.corporateForm.getRawValue().otherAddresses;
    this.corporateForm.value["domains"] = this.corporateForm.getRawValue().domains;

    this.corporateForm.value["otherAddresses"].forEach((control, index) => {
      Object.keys(control).map(k => (control[k] = typeof control[k] == "string" ? control[k].trim() : control[k]));
      if (!control.address) {
        this.locations["controls"][index]["controls"].address.setErrors({ required: true });
      }
    });

    this.corporateForm.value["domains"].forEach((control, index) => {
      Object.keys(control).map(k => (control[k] = typeof control[k] == "string" ? control[k].trim() : control[k]));
      if (!control.domain) {
        this.domains["controls"][index]["controls"].domain.setErrors({ required: true });
      }
    });

    if (!this.f.address.value) {
      this.f.address.setErrors({ required: true });
    }

    if (!this.f.startDate.value) {
      this.f.startDate.setErrors({ required: true });
    }

    if (!this.f.endDate.value) {
      this.f.endDate.setErrors({ required: true });
    }

    if (!this.cropFile) {
      this.f.logo.setErrors({ 'image': true });
      return
    }

    if (!this.f.startDate.valid) {
      this.f.startDate.setErrors({ 'invalid': true });
      return
    }
  }

  trimValues() {
    for (const key in this.corporateForm.value) {
      if (this.corporateForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
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
    this._router.navigate([CORPORATES]);
  }

}
