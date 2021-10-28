import { Component, OnInit } from '@angular/core';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { GroupService } from '../../_service/group.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { GROUP_ERROR_MESSAGES, GROUP_PRIVACY, SQAUD_TYPES } from '../../../../../constants/messages';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { BC_GROUPS_EDIT, BC_GROUPS_ADD } from '../../../../../constants/breadcrumb-routes';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { toUpperCase } from '../../../../../constants/helper';
import { GROUPS } from '../../../../../constants/routes';

@Component({
  selector: 'lv-add-edit-groups',
  templateUrl: './add-edit-groups.component.html',
  styleUrls: ['./add-edit-groups.component.scss'],
  providers: [S3BucketService, GroupService]
})
export class AddEditGroupsComponent implements OnInit {
  groupForm: FormGroup;
  squadId: string;
  groupDetails: Group.GroupData;
  groupPrivacy = GROUP_PRIVACY;
  cropFile: any;
  _limit = LIMIT;
  errMsg = GROUP_ERROR_MESSAGES;
  public sqaudTypes = SQAUD_TYPES;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _common: CommonService,
    private _toast: ToastService,
    private _group: GroupService,
    private _s3: S3BucketService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _loc: Location,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.squadId = this._actRoute.snapshot.params['squadId'];
    this.createForm();
    if (this.squadId) {
      this._bc.setBreadcrumb(BC_GROUPS_EDIT);
      if (this._common.isValidId(this.squadId)) {
        this.getSquadDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_GROUPS_ADD);
    }
  }

  createForm() {
    this.groupForm = this._fb.group({
      image: [''],
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      shortName: [''],
      userLimit: [, [Validators.pattern(REGEX.AMOUNT)]],
      type: [''],
      privacy: [this.groupPrivacy[0].value],
      description: this._fb.group({
        en: [''],
        vi: ['']
      })
    })
  }

  get f() { return this.groupForm.controls } //return form controls

  getSquadDetails() {
    this._group.getGroupDetail({ squadId: this.squadId }).subscribe((res: Group.GroupDetail) => {
      if (res.statusCode == 200) {
        this.groupDetails = res.data;
        this.cropFile = {
          cropBase64: this.groupDetails.image,
          cropFile: this.groupDetails.image
        }
        this.groupForm.patchValue(this.groupDetails);
      }
    })
  }

  onChangePrivacy() {
    if (this.squadId) {
      this.f.privacy.setValue(this.groupDetails.privacy);
    }
  }

  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 10 / 7.5, inputWidth: 400, type: 'CHALLENGE' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.image.setErrors(null);
        this.f.image.markAsDirty();
      }
    });
  }

  async groupHandler() {
    this.checkValidation();
    if (this.groupForm.valid) {
      let formValue = this.groupForm.value;
      formValue.userLimit = Number(formValue.userLimit);
      formValue.shortName = toUpperCase(formValue.shortName);

      if (this.cropFile && this.f.image.dirty) {
        await this.uploadImage(formValue);
      }

      if (this.squadId) {
        if (this.groupForm.dirty) {
          this.updateSquad(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewSquad(formValue);
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

  addNewSquad(formBody: any) {
    this._group.addGroup(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateSquad(formBody: any) {
    formBody['squadId'] = this.squadId;
    this._group.updateGroup(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {

    for (const key in this.groupForm.value) {
      if (this.groupForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.cropFile) {
      this.f.image.setErrors({ 'image': true });
      return
    }
  }

  cancelHandler() {
    this._loc.back();
  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([GROUPS]);
  }

}
