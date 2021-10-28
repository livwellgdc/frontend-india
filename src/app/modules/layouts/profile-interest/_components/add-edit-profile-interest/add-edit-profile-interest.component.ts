import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LIMIT } from '../../../../../constants/validator';
import { PROFILE_INTEREST_ERROR_MESSAGES, INTEREST_CATGORY_TYPE } from '../../../../../constants/messages';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { ProfileInterestService } from '../../_service/profile-interest.service';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-add-edit-profile-interest',
  templateUrl: './add-edit-profile-interest.component.html',
  styleUrls: ['./add-edit-profile-interest.component.scss'],
})
export class AddEditProfileInterestComponent extends Pagination implements OnInit {
  profileInterestForm: FormGroup;
  _limit = LIMIT;
  errMsg = PROFILE_INTEREST_ERROR_MESSAGES;
  interestCategories = INTEREST_CATGORY_TYPE;

  constructor(
    public _dialogRef: MatDialogRef<AddEditProfileInterestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _interest: ProfileInterestService,
    private _toast: ToastService) { super() }

  ngOnInit() {
    this.createForm();
    if (this.data.id == 1) {
      this.patchProfileInterestData();
    }
  }

  createForm() {
    this.profileInterestForm = this._fb.group({
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      categoryName: ['']
    })
  }

  get f() { return this.profileInterestForm.controls; } //return form controls

  profileInterestHandler() {
    this.trimValues();
    if (this.profileInterestForm.valid) {
      if (this.data.id == 0) {
        this.addProfileInterest();
      } else {
        this.updateProfileInterest();
      }
    }
  }

  addProfileInterest() {
    this._interest.addInterest(this.profileInterestForm.value).subscribe((response: any) => {
      this.closePopup(response);
    }, (error) => {
      if (error.statusCode == 401) {
        this.closePopup('', false);
      }
    })
  }

  updateProfileInterest() {
    if (!this.profileInterestForm.dirty) {
      this._dialogRef.close(false);
      return
    }
    this.profileInterestForm.value['interestId'] = this.data.data._id;
    this._interest.updateInterest(this.profileInterestForm.value).subscribe((response: any) => {
      this.closePopup(response);
    }, (error) => {
      if (error.statusCode == 401) {
        this.closePopup('', false);
      }
    })
  }

  closePopup(response?, showMssg = true) {
    this._dialogRef.close({ isHitApi: showMssg ? true : false });
    if (showMssg) {
      this._toast.success(response.message);
    }
  }

  patchProfileInterestData() {
    this.profileInterestForm.patchValue(this.data.data);
  }

  trimValues() {
    for (const key in this.profileInterestForm.value) {
      if (this.profileInterestForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }
  }

}
