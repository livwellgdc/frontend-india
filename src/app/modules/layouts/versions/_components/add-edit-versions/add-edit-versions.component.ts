import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LIMIT } from '../../../../../constants/validator';
import { VERSION_ERROR_MESSAGES } from './../../../../../constants/messages';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { VersionService } from '../../_service/version.service';
import { PLATFORM_TYPE, VERSION_UPDATES_TYPE } from '../../../../../constants/messages';

@Component({
  selector: 'lv-add-edit-versions',
  templateUrl: './add-edit-versions.component.html',
  styleUrls: ['./add-edit-versions.component.scss']
})
export class AddEditVersionsComponent implements OnInit {
  versionForm: FormGroup;
  _limit = LIMIT;
  errMsg = VERSION_ERROR_MESSAGES;
  platFormType = PLATFORM_TYPE;
  versionUpdateType = VERSION_UPDATES_TYPE;

  constructor(
    public _dialogRef: MatDialogRef<AddEditVersionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _version: VersionService,
    private _toast: ToastService) { }

  ngOnInit() {
    this.createForm();
    if (this.data.id == 1) {
      this.patchVersionData();
    }
  }

  createForm() {
    this.versionForm = this._fb.group({
      name: [''],
      currentVersion: [''],
      platform: [''],
      updateType: [''],
      description: ['']
    })
  }

  get f() { return this.versionForm.controls; } //return form controls

  versionHandler() {
    this.trimValues();
    if (this.versionForm.valid) {
      let formValue = this.versionForm.value;
      if (this.data.id == 0) {
        this.addVersion(formValue);
      } else {
        this.updateVersion(formValue);
      }
    }
  }

  addVersion(formValue) {
    this._version.addVersion(formValue).subscribe((response: any) => {
      this.closePopup(response);
    }, (error) => {
      if (error.statusCode == 401) {
        this.closePopup('', false);
      }
    })
  }

  updateVersion(formValue) {
    if (!this.versionForm.dirty) {
      this._dialogRef.close(false);
      return
    }
    formValue['versionId'] = this.data.data._id;
    this._version.updateVersion(formValue).subscribe((response: any) => {
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

  patchVersionData() {
    let formValue = this.data.data;
    this.versionForm.patchValue(formValue);
    this.f.currentVersion.setValue(String(formValue.currentVersion).split('v')[1]);
  }

  trimValues() {
    for (const key in this.versionForm.value) {
      if (this.versionForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }
  }

}
