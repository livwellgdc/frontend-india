import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from './../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from './../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { Pagination } from '../../../../../constants/paginator';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { timeWithDateMs } from '../../../../../constants/helper';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { EVENTS } from '../../../../../constants/routes';
import { Location } from '@angular/common';
import { EventsService } from '../../_service/events.service';
import { GoogleMapComponent } from '../../../../../components/google-map/google-map.component';
import { MatDialog } from '@angular/material';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { BC_EVENTS_EDIT, BC_EVENTS_ADD } from './../../../../../constants/breadcrumb-routes';
import { EVENT_ERROR_MESSAGES, INVALID_DATE_TIME_ERROR, TIME_ERROR, DATA_NOT_FOUND } from '../../../../../constants/messages';

@Component({
  selector: 'lv-add-edit-events',
  templateUrl: './add-edit-events.component.html',
  styleUrls: ['./add-edit-events.component.scss'],
  providers: [S3BucketService]
})
export class AddEditEventsComponent extends Pagination implements OnInit {

  eventForm: FormGroup;
  eventId: string;
  _limit = LIMIT;
  errMsg = { ...EVENT_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  categoryList = [];
  maxDate = new Date();
  todayEvent = new Date();
  eventDetails: Event.EventData;
  cropFile: any;

  constructor(private _fb: FormBuilder,
    private _actRoute: ActivatedRoute,
    private _bc: BreadcrumbService,
    private _toast: ToastService,
    private _common: CommonService,
    private _s3: S3BucketService,
    private _event: EventsService,
    private _loc: Location,
    private _dialog: MatDialog,
    private _router: Router) {
    super();
    this.maxDate.setHours(23, 59, 59);
  }

  ngOnInit() {
    this.eventId = this._actRoute.snapshot.params['eventId'];
    this.createForm();
    this.getCategoryList();
    if (this.eventId) {
      this._bc.setBreadcrumb(BC_EVENTS_EDIT);
      if (this._common.isValidId(this.eventId)) {
        this.getEventDetails();
      }
    } else {
      this.setDateTime();
      this._bc.setBreadcrumb(BC_EVENTS_ADD);
    }
  }

  createForm() {
    this.eventForm = this._fb.group({
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      image: [''],
      description: this._fb.group({
        en: [''],
        vi: ['']
      }),
      startDate: [],
      endDate: [],
      startTime: [],
      endTime: [],
      categoryId: this._fb.group({
        _id: [''],
        name: this._fb.group({
          en: [''],
          vi: ['']
        }),
        description: [''],
        image: [''],
        status: [''],
        created: []
      }),
      address: [''],
      coordinates: [[]],
      websiteLink: ['', [Validators.pattern(REGEX.URL)]],
      enrolmentLink: ['', [Validators.pattern(REGEX.URL)]],
      sponsorName: [''],
      isFeatured: [false]
    })
  }

  get f() { return this.eventForm.controls } //return form controls

  setDateTime() {
    if (this._common.isValidHoursLeftInDay('EVENT')) {
      this.f.startDate.setValue(this.todayEvent);
      this.f.startTime.setValue(new Date(this.today.setMinutes(this.today.getMinutes() + 60)));
    } else {
      this.maxDate = null;
      this.todayEvent.setDate(this.todayEvent.getDate() + 1);
      this.today.setDate(this.today.getDate() + 1);
      this.f.startDate.setValue(this.todayEvent);
      this.f.startTime.setValue(new Date(this.today.setHours(0, 0, 0)));
    }
  }


  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 10 / 7.5, inputWidth: 400, type: 'EVENT' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.image.setErrors(null);
        this.f.image.markAsDirty();
      }
    });
  }

  getEventDetails() {
    this._event.getEventDetail({ eventId: this.eventId }).subscribe((res: Event.EventDetail) => {
      if (res.statusCode == 200) {
        this.eventDetails = res.data;
        if (this.eventDetails.image) {
          this.cropFile = {
            cropBase64: this.eventDetails.image,
            cropFile: this.eventDetails.image
          }
        }
        this.eventForm.patchValue(this.eventDetails);
        this.f.image.setValue(this.eventDetails.image);
        if (this.eventDetails.location && this.eventDetails.location.address) {
          this.f.address.setValue(this.eventDetails.location.address);
          this.f.coordinates.setValue(this.eventDetails.location.coordinates);
        }
        this.f.startDate.setValue(new Date(this.eventDetails.startTime));
        this.f.endDate.setValue(new Date(this.eventDetails.endTime));
        this.f.startTime.setValue(new Date(this.eventDetails.startTime));
        this.f.endTime.setValue(new Date(this.eventDetails.endTime));
      }
    })
  }

  getCategoryList() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: this.API_EVENT.event,
      status: this.API_EVENT.active
    }
    this._common.getCategories(queryObj).subscribe(res => {
      if (res.statusCode === 200) {
        this.categoryList = res.data;
      }
    })
  }

  eventStartDateChange() {
    this.f.endDate.setValue(null);
    if (this.checkTodayDate(this.eventForm.value.startDate)) {
      this.today = new Date();
      this.f.startTime.setValue(new Date(this.today.setMinutes(this.today.getMinutes() + 60)));
    } else {
      this.today = null;
    }
  }


  eventEndDateChange() {
    if (this.f.endTime.value) {
      this.eventEndTimeChange({ value: this.f.endTime.value }, this.f.startTime.value)
    }
  }

  eventStartTimeChange(event: any) {
    this.f.endTime.setValue(null);
    this.futureTimeHandler(this.f.startTime.value);
  }

  eventEndTimeChange(event: any, startHour: any) {
    // if (this.checkTodayDate(this.eventForm.value.endDate)) {
    //   if ((+event.value) - (+startHour) < 50000) {
    //     this.f.endTime.setValue(null);
    //     this._toast.error(TIME_ERROR.GREATER_TIME);
    //     return
    //   }
    // }
  }

  futureTimeHandler(startTimeValue) {
    if (this.checkTodayDate(this.eventForm.value.startDate)) {
      let a = new Date(startTimeValue);
      if (a.getTime() < Date.now()) {
        this._toast.error(TIME_ERROR.FUTURE_TIME);
        this.f.startTime.setValue(null);
        this.f.endTime.setValue(null);
        return true;
      } else {
        return false;
      }
    }
  }

  checkTodayDate(date) {
    if (date) {
      let formDate = new Date(date);
      let currentFormDate = new Date(formDate.toISOString()).setHours(0, 0, 0, 0);
      let currentDate = new Date().setHours(0, 0, 0, 0);
      if (currentFormDate === currentDate) {
        return true;
      } else {
        return false;
      }
    }
  }

  categorySelectionHandler(categoryId: string) {
    for (let find = 0; find < this.categoryList.length; find++) {
      if (categoryId == this.categoryList[find]._id) {
        this.f.categoryId.patchValue(this.categoryList[find]);
        break;
      }
    }
  }

  openGoogleMap() {
    const dialogRef = this._dialog.open(GoogleMapComponent, {
      width: "400px",
      data: { data: this.eventForm.value }
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
          this.f.address.markAsDirty();
          this.eventForm.patchValue(result);
        } else {
          this._toast.error(DATA_NOT_FOUND);
        }
      }
    });
  }

  async eventHandler() {
    this.checkValidation();
    if (this.eventForm.valid) {
      let formValue = this.eventForm.value;
      let isFuture = this.futureTimeHandler(formValue.startTime);

      if (!isFuture) {
        formValue.startTime = timeWithDateMs(formValue.startTime, formValue.startDate);
        formValue.endTime = timeWithDateMs(formValue.endTime, formValue.endDate);
        delete formValue.startDate;
        delete formValue.endDate;
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

        let finalFormBody = { ...formValue, ...formatLocation }; //merge two objects

        if (finalFormBody.startTime >= finalFormBody.endTime) {
          this._toast.error(TIME_ERROR.GREATER_TIME);
          return
        }

        if (this.cropFile && this.f.image.dirty) {
          await this.uploadImage(finalFormBody);
        }

        if (this.eventId) {
          if (this.eventForm.dirty) {
            this.updateEvent(finalFormBody);
          } else {
            this.navigate();
          }
        } else {
          this.addNewEvent(finalFormBody);
        }
      } else {
        return
      }
    }
  }

  uploadImage(formValue) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.cropFile.cropFile).then((response: any) => {
        if (response && response.Location) {
          formValue.image = response.Location;
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  addNewEvent(formBody: any) {
    this._event.addEvent(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateEvent(formBody: any) {
    formBody['eventId'] = this.eventId;
    this._event.updateEvent(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {

    this.f.endDate.setValidators([Validators.required]);
    this.f.address.setValidators([Validators.required]);

    for (const key in this.eventForm.value) {
      if (this.eventForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.cropFile) {
      this.f.image.setErrors({ 'image': true });
      return
    }

    if (!this.f.endDate.value) {
      this.f.endDate.setErrors({ required: true });
    }

    if (!this.f.address.value) {
      this.f.address.setErrors({ required: true });
    }

    if (!this.f.startDate.valid) {
      this.f.startDate.setErrors({ 'invalid': true });
      return
    }

    if (!this.f.startTime.value) {
      this.f.startTime.setErrors({ required: true });
    }

    if (!this.f.endTime.value) {
      this.f.endTime.setErrors({ required: true });
    }

  }

  cancelHandler() {
    this._loc.back();
  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([EVENTS]);
  }

}
