import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_CLASSES_ADD, BC_CLASSES_EDIT, BC_CLASSES_COPY } from '../../../../../constants/breadcrumb-routes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { ClassService } from '../../_service/class.service';
import { Pagination } from '../../../../../constants/paginator';
import { timeWithDateMs, removePrefixFromArrayValues } from '../../../../../constants/helper';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CLASSES } from '../../../../../constants/routes';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { CommonService } from '../../../../../services/common/common.service';
import { FilesUploadComponent } from '../../../../../components/files-upload/files-upload.component';
import { ImportExportService } from '../../../../../services/import-export/import-export.service';
import { ConfirmationModalComponent } from '../../../../../components/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { CsvUploadPopupComponent } from './_component/csv-upload-popup/csv-upload-popup.component';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { CLASS_ERROR_MESSAGES, CLASS_TYPE, CLASS_PURCHASE_TYPE, ACCESS_TYPE, STUDIO_TYPE, DIFFICULTY_LEVEL, TIME_ERROR, VIDEO_FORMAT, CLASS_MEDIA_LIMITS, SELECT_VALID_FILE, IMPORT_FILES_POPUP_MESSAGES, VALID_CSV_FILE_SIZE, INVALID_DATE_TIME_ERROR, NO_EDIT_ACTION, invalidVideoError } from '../../../../../constants/messages';
import { SeatsArrangementComponent } from '../../../../../components/seats-arrangement/seats-arrangement.component';
import { ShowImageComponent } from '../../../../../components/show-image/show-image.component';
import { SAMPLE_EXPORT_API } from '../../../../../constants/api-end-point';

@Component({
  selector: 'lv-add-edit-classes',
  templateUrl: './add-edit-classes.component.html',
  styleUrls: ['./add-edit-classes.component.scss'],
  providers: [ClassService, S3BucketService, ImportExportService]
})

export class AddEditClassesComponent extends Pagination implements OnInit {
  classForm: FormGroup;
  _limit = LIMIT;
  errMsg = { ...CLASS_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  classType = CLASS_TYPE;
  classPurchaseType = CLASS_PURCHASE_TYPE;
  classAccessType = ACCESS_TYPE;
  classStudio = STUDIO_TYPE;
  difficultyLevel = DIFFICULTY_LEVEL;

  fileFormat = VIDEO_FORMAT;
  postMediaError = invalidVideoError();
  classMediaLimits = CLASS_MEDIA_LIMITS;

  categoryList = [];
  cityList = [];
  searchedCity = [];
  clubList = [];
  maxDate = new Date();
  todayClass = new Date();
  classId: string;
  copyClassId: string;
  classDetails: Class.ClassData;
  csvUploadStatus: any;
  isCityCallInProgress = false;
  isClubCallInProgress = false;

  files: File[] = [];
  formData = new FormData();
  cropFile: any;
  cropFile2: any;
  seats = []; //this is available seats at livwell platform
  seatMapfileName: string = '';
  isHitSubmit = false;


  @ViewChild("myInputFile", null) myInputFile: ElementRef;
  @ViewChild('availableSeat', { static: true }) availableSeat: ElementRef;
  @ViewChild('increaseSeat', { static: true }) increaseSeat: ElementRef;
  @ViewChild(FilesUploadComponent, { static: true }) filesUploadComponent: FilesUploadComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _class: ClassService,
    private _toast: ToastService,
    private _router: Router,
    private _common: CommonService,
    private _s3: S3BucketService,
    private _importExport: ImportExportService,
    private _dialog: MatDialog,
    private _loc: Location
  ) {
    super();
    this.maxDate.setHours(23, 59, 59);
  }

  ngOnInit() {
    this.classId = this._actRoute.snapshot.params['classId'];
    this.copyClassId = this._actRoute.snapshot.queryParams['copyClass'];
    this.createForm();
    this.getCities();
    this.getCategoryList();
    if (this.classId) {
      this._bc.setBreadcrumb(BC_CLASSES_EDIT);
      if (this._common.isValidId(this.classId)) {
        this.getClassDetails();
      }
    } else if (this.copyClassId) {
      this._bc.setBreadcrumb(BC_CLASSES_COPY);
      if (this._common.isValidId(this.copyClassId)) {
        this.getClassDetails();
      }
    } else {
      this.setDateTime();
      this._bc.setBreadcrumb(BC_CLASSES_ADD);
    }
  }

  createForm() {
    this.classForm = this._fb.group({
      name: [''],
      description: [''],
      startDate: [],
      startTime: [],
      endTime: [],
      type: [''],
      city: [''],
      clubId: this._fb.group({
        _id: [''],
        name: [''],
        shortName: [''],
        qrCode: [''],
        status: ['']
      }),
      studioName: [''],
      classImage: [''],
      image: [''],
      seatMapImage: [''],
      totalParticipant: [, [Validators.pattern(REGEX.AMOUNT)]],
      availableSeats: [],
      points: [],
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
      price: [''],
      videoConferenceLink: [''],
      puchaseDenominationType: [''],
      // accessType: [''],
      instructorName: [''],
      difficultyLevel: [[]]
    })
  }

  get f() { return this.classForm.controls; } // return form controls

  setDateTime() {
    if (this._common.isValidHoursLeftInDay('CLASS')) {
      this.f.startDate.setValue(this.todayClass);
      this.f.startTime.setValue(new Date(this.today.setMinutes(this.today.getMinutes() + 130)));
    } else {
      this.maxDate = null;
      this.todayClass.setDate(this.todayClass.getDate() + 1);
      this.today.setDate(this.today.getDate() + 1);
      this.f.startDate.setValue(this.todayClass);
      this.f.startTime.setValue(new Date(this.today.setHours(0, 0, 0)));
    }
    this.classStartTimeChange({ value: (this.f.startTime.value) });
  }

  getClassDetails() {
    this._class.getClassDetail({ classId: this.classId ? this.classId : this.copyClassId }).subscribe((res: Class.ClassDetail) => {
      if (res.statusCode == 200) {
        this.classDetails = res.data;
        this.seats = removePrefixFromArrayValues(this.classDetails.seats);
        if (this.classDetails.media.length > 0) {
          for (let find = 0; find < this.classDetails.media.length; find++) {
            if (this.classDetails.media[find].type == 'IMAGE') {
              this.f.classImage.setValue(this.classDetails.media[find].url);
              this.cropFile = {
                cropBase64: this.classDetails.media[find].url,
                cropFile: this.classDetails.media[find].url
              }
              this.classDetails.media.splice(find, 1);
              break;
            }
          }
        }

        this.filesUploadComponent.urls = this.classDetails.media.map(x => x.url);
        this.getClubsByCity(this.classDetails.city);
        this.classForm.patchValue(this.classDetails);
        this.f.seatMapImage.setValue(this.classDetails.seatMapImage);
        if (this.classDetails.image) {
          this.f.image.setValue(this.classDetails.image);
        }
        if (this.classId) {
          this.f.startDate.setValue(new Date(this.classDetails.startTime));
          this.f.startTime.setValue(new Date(this.classDetails.startTime));
          this.f.endTime.setValue(new Date(this.classDetails.endTime));
        } else {
          this.setDateTime();
        }
      }
    })
  }

  onSelectFile(id: number, ratio = 10 / 7.5, inputWidth = 400, type = 'CLASS') {
    console.log(ratio, type);
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: ratio, inputWidth: inputWidth, type: type }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (id) {
          case 1:
            this.cropFile = result;
            this.f.classImage.setValue(this.cropFile.cropBase64);
            this.f.classImage.markAsDirty();
            break;
          case 2:
            this.directUploadSeatMapImage(result);
            break;
          case 3:
            this.cropFile2 = result;
            this.f.image.setValue(this.cropFile2.cropBase64);
            this.f.image.markAsDirty();
            break;
          default:
            break;
        }
      }
    });
  }

  directUploadSeatMapImage(uploadDataFile: any) {
    this.seatMapfileName = uploadDataFile.real.name;
    this._s3.uploadFile(uploadDataFile.cropFile).then((response: any) => {
      if (response && response.Location) {
        this.f.seatMapImage.setValue(response.Location);
        this.f.seatMapImage.markAsDirty();
      }
    }, (error) => {
      this.f.seatMapImage.setValue('');
    })
  }

  viewSeatMapImage() {
    this._dialog.open(ShowImageComponent, {
      data: { image: this.f.seatMapImage.value }
    });
  }

  removeImageFile(val = 0) {
    switch (val) {
      case 0:
        this.f.image.setValue('');
        this.cropFile2 = '';
        this.onChangeFilesHandler();
        break;
      case 1:
        this.f.image.setValue('');
        this.cropFile2 = '';
        this.onChangeFilesHandler();
        break;
      default :
        break;
    }

  }

  getCities() {
    this._common.getCities().then((res: []) => {
      this.cityList = res;
      this.searchedCity = res;
    })
  }

  searchCityByName(searchKey) {
    this.searchedCity = this.cityList.filter((city) => {
      if (city.name.toLowerCase().startsWith(searchKey.toLowerCase())) {
        return city
      }
    });
  }

  getCategoryList() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: this.API_EVENT.class,
      status: this.API_EVENT.active
    }
    this._common.getCategories(queryObj).subscribe(res => {
      if (res.statusCode === 200) {
        this.categoryList = res.data;
      }
    })
  }

  onChangeFilesHandler(event?) {
    this.classForm.markAsDirty();
  }

  CitySelectionHandler(event) {
    this.f.clubId.setValue({ _id: '', name: '', shortName: '', qrCode: '', status: '' });
    this.getClubsByCity(event.value);
  }

  getClubsByCity(cityName: string) {
    this.clubList = [];
    this._class.getClub({ cityName: cityName }).subscribe(res => {
      if (res.statusCode === 200) {
        this.clubList = res.data;
      }
    }, (error) => {
      this.f.city.setValue('');
    })
  }

  clubSelectionHandler(clubId: string) {
    for (let find = 0; find < this.clubList.length; find++) {
      if (clubId == this.clubList[find]._id) {
        this.f.clubId.patchValue(this.clubList[find]);
        break;
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

  classDateChange() {
    if (this.checkTodayDate()) {
      this.today = new Date();
    } else {
      this.today = null;
    }
  }

  classStartTimeChange(event: any) {
    if (event) {
      let time = new Date(event.value);
      this.f.endTime.setValue(new Date(time.setMinutes(time.getMinutes() + 30)));
    }
  }

  classEndTimeChange(event: any, startHour: any) {
    if (+event.value - +startHour < 1800000) {
      this.f.endTime.setValue(null);
      this._toast.info(TIME_ERROR.SET_MIN_TIME());
      return;
    }
  }

  checkTodayDate() {
    if (this.classForm.value.startDate) {
      let formDate = new Date(this.classForm.value.startDate);
      let currentFormDate = new Date(formDate.toISOString()).setHours(0, 0, 0, 0);
      let currentDate = new Date().setHours(0, 0, 0, 0);
      if (currentFormDate === currentDate) {
        return true;
      } else {
        return false;
      }
    }
  }

  saveAvailableSeats() {
    this.confirmSaveSetsAvailabilty(this.f.totalParticipant.value, this.f.availableSeats.value);
  }

  confirmSaveSetsAvailabilty(totalParticipants: any, availableSeats: any, showFocus = true) {
    if (Number(totalParticipants)) {
      if (Number(availableSeats)) {
        if (this.seats.includes(availableSeats)) {
          this._toast.error(this.errMsg.ALREADY_AVAILABLE_SEAT, '', 3000);
        } else {
          if (this.seats.length < Number(totalParticipants)) {
            this.seats.push(availableSeats);
            this.seats.sort((a, b) => a - b);
          } else {
            this._toast.error(this.errMsg.AVAIL_SEAT_MORE_THAN_TOTAL_SEATS, '', 3000);
            this.increaseSeat.nativeElement.focus();
          }
        }
      } else {
        if (availableSeats) {
          this._toast.error(this.errMsg.CLASS_INVALID_SEATS, '', 2000);
        }
      }
    } else {
      this._toast.error(this.errMsg.TOTAL_SEATS_FIRST, '', 2000);
    }
    this.setAvailableSeats(showFocus);
  }

  setAvailableSeats(showFocus = true) {
    this.f.availableSeats.setValue('');
    if (showFocus) {
      this.availableSeat.nativeElement.focus();
    }
  }

  viewAvailableSeats() {
    let dialogRef = this._dialog.open(SeatsArrangementComponent, {
      data: { seatArray: this.addSeatPrefixArray(), isSeatRemovalOption: true },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      this.seats = res;
    })
  }

  addSeatPrefixArray() {
    return this.seats.map(el => 'S' + el);
  }

  async classHandler() {
    if (this.classId && !this.classDetails.isEdited) {
      this._toast.error(NO_EDIT_ACTION());
      this.navigate();
      return;
    }

    this.checkValidation();
    if (this.classForm.valid) {
      let formValue = this.classForm.value;

      formValue.totalParticipant = Number(formValue.totalParticipant);
      formValue.points = Number(formValue.points);

      if (this.seats.length > 0) {
        this.confirmSaveSetsAvailabilty(formValue.totalParticipant, formValue.availableSeats, false);
        formValue['seats'] = this.addSeatPrefixArray();
        delete formValue['availableSeats'];
      } else {
        this._toast.error(this.errMsg.CLASS_AVAILABLE_SEATS, '', 3000);
        return
      }

      if (this.seats.length > Number(formValue.totalParticipant)) {
        this._toast.error(this.errMsg.AVAILABLE_SEAT_GREATER);
        return
      }

      if (!formValue.seatMapImage) {
        this._toast.error(this.errMsg.SEAT_IMAGE);
        return
      }

      formValue.startTime = timeWithDateMs(formValue.startTime, formValue.startDate);
      formValue.endTime = timeWithDateMs(formValue.endTime, formValue.startDate);
      delete formValue.startDate;

      let alreadyUploadedMedia = [];
      if (this.classDetails && this.classDetails.media.length) {
        alreadyUploadedMedia = this.classDetails.media.filter(
          x => this.filesUploadComponent._store.find(item => item.url == x.url)
        );
      }

      formValue['media'] = alreadyUploadedMedia;

      let media = this.filesUploadComponent._store.filter(
        x => !this.classDetails || !this.classDetails.media.find(item => item.url == x.url)
      );

      if (media.length) {
        let results = await this._s3.uploadMultipleFiles(media.map(item => item.file));
        media.forEach((item, index) => {
          formValue.media.push({ url: results[index].Location, type: 'VIDEO' });
        })
      }

      //For Separate Class Image
      if (this.cropFile && this.f.classImage.dirty) {
        await this.uploadImage();
      }
      if (this.cropFile && this.f.image.dirty) {
        await this.uploadImage(1);
      }

      if (this.f.classImage.value) {
        formValue['media'].unshift({ url: this.f.classImage.value, type: 'IMAGE' });
      }
      if (this.f.image.value) {
        formValue.image = this.f.image.value
      }
      delete formValue['classImage'];

      this.isHitSubmit = true;

      if (this.classId) {
        if (this.classForm.dirty) {
          for (let i = 0; i < formValue.media.length; i++) {
            delete formValue.media[i].thumbnailImage;
          }
          this.updateClass(formValue);
        } else {
          this.navigate();
        }
      } else {

        console.log("heyyy", formValue);
        this.addNewClass(formValue);
      }

    }
  }

  addNewClass(formValue: any) {
    this._class.addClass(formValue).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    }, () => {
      this.isHitSubmit = false;
    })
  }

  updateClass(formValue: any) {
    formValue['classId'] = this.classId;
    this._class.updateClass(formValue).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    }, () => {
      this.isHitSubmit = false;
    })
  }

  uploadImage(type?) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.cropFile.cropFile).then((response: any) => {
        if (response && response.Location) {
          if (type == 1) {
            this.f.image.setValue(response.Location);
          } else {
            this.f.classImage.setValue(response.Location);
          }

          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  checkValidation() {
    this.f.startDate.setValidators([Validators.required]);

    for (const key in this.classForm.value) {
      if (this.classForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.f.startDate.value) {
      this.f.startDate.setErrors({ required: true });
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
    if (!this.f['clubId']['controls']._id.value) {
      this.f['clubId']['controls']._id.setErrors({ required: true });
    }

  }

  downloadSampleFile() {
    let obj = [];
    this._common.exportReports(SAMPLE_EXPORT_API, obj);
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (this._common.isValidCSVFile(file)) {
        if (event.target.files[0].size > 5000000) {
          this._toast.info(VALID_CSV_FILE_SIZE);
          return;
        }
        this.files = [];
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          this.files.push(fileList[0]);
          this.confirmFilePopup();
        }
      } else {
        this._toast.error(SELECT_VALID_FILE);
        this.removeSelectedFiles();
      }
    }
  }

  confirmFilePopup() {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      minWidth: '400px',
      data: { title: IMPORT_FILES_POPUP_MESSAGES.TITLE, message: IMPORT_FILES_POPUP_MESSAGES.MESSAGE }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.importCsv();
      } else {
        this.removeSelectedFiles();
      }
    });
  }

  importCsv() {
    if (this.files.length > 0) {
      this._importExport.importFiles(this.files[0]).then((res: any) => {
        if (res.statusCode == 200) {
          this.csvUploadStatus = res;
          this.removeSelectedFiles();
          this.openCsvUploadStatus(this.csvUploadStatus);
        }
      }, (error) => {
        this._toast.error(error);
        this.removeSelectedFiles();
      });
    }
  }

  openCsvUploadStatus(csvUploadResponse: any) {
    const dialogRef = this._dialog.open(CsvUploadPopupComponent, {
      minWidth: '1000px',
      disableClose: true,
      data: csvUploadResponse
    });
  }

  openRecentUploadStatus() {
    this.openCsvUploadStatus(this.csvUploadStatus);
  }

  removeSelectedFiles() {
    this.myInputFile.nativeElement.value = "";
    this.files = [];
    return
  }

  cancelHandler() {
    this._loc.back();
  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([CLASSES]);
  }

  ngOnDestroy() {
    if (!this.isHitSubmit) {
      if (this.seatMapfileName) {
        this._s3.deleteFile(this.seatMapfileName).then(response => {
        })
      }
    }
  }

}
