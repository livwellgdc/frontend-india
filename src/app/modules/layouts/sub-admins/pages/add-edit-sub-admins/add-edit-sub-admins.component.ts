import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { SUB_ADMINS_ERROR_MESSAGES, PERMISSION, MANAGE_TYPE_OF } from '../../../../../constants/messages';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SubAdminService } from '../../_service/sub-admin.service';
import { BC_SUB_ADMINS_EDIT, BC_SUB_ADMINS_ADD } from '../../../../../constants/breadcrumb-routes';
import { SUB_ADMINS } from '../../../../../constants/routes';

@Component({
  selector: 'lv-add-edit-sub-admins',
  templateUrl: './add-edit-sub-admins.component.html',
  styleUrls: ['./add-edit-sub-admins.component.scss'],
  providers: [SubAdminService]
})
export class AddEditSubAdminsComponent implements OnInit {
  subAdminForm: FormGroup;
  _limit = LIMIT;
  errMsg = SUB_ADMINS_ERROR_MESSAGES;
  subAdminId: string;
  subAdminDetails: SubAdmin.SubAdminData;
  manageTypeValue = MANAGE_TYPE_OF;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _toast: ToastService,
    private _common: CommonService,
    private _subAdmin: SubAdminService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subAdminId = this._actRoute.snapshot.params['subAdminId'];
    this.createForm();
    if (this.subAdminId) {
      this._bc.setBreadcrumb(BC_SUB_ADMINS_EDIT);
      if (this._common.isValidId(this.subAdminId)) {
        this.getSubAdminDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_SUB_ADMINS_ADD);
      this.defaultPermissionRenderer();
    }
  }

  createForm() {
    this.subAdminForm = this._fb.group({
      name: [''],
      email: ['', [Validators.pattern(REGEX.EMAIL)]],
      permission: this._fb.array([]),
    });
  }

  private permissionArray(data?: any) {
    return this._fb.group({
      manageType: [data ? data.manageType : ""],
      sectionId: [data ? data.sectionId : ""],
      all: [this.subAdminId ? data.all : false],
      view: [this.subAdminId ? data.view : true],
      exportReport: [this.subAdminId ? data.exportReport : false],
      deleteBlock: [this.subAdminId ? data.deleteBlock : false],
      addEdit: [this.subAdminId ? data.addEdit : false],
    });
  }

  private newPermissionArray(data?: any) {
    return this._fb.group({
      manageType: [data ? data.manageType : ""],
      sectionId: [data ? data.sectionId : ""],
      all: [false],
      view: [true],
      exportReport: [false],
      deleteBlock: [false],
      addEdit: [false],
    });
  }

  get permissionKey() {
    return this.subAdminForm.get('permission') as FormArray;
  }

  permissionByIndex(index: number) {
    return this.subAdminForm.get('permission')['controls'][index] as FormArray;
  }

  addPermission(data?: any): void {
    this.permissionKey.push(this.permissionArray(data));
  }

  addNewPermission(data?: any): void {
    this.permissionKey.push(this.newPermissionArray(data));
  }

  defaultPermissionRenderer() {
    PERMISSION.forEach((permission) => {
      this.addPermission(permission);
    });
  }

  get f() { return this.subAdminForm.controls } // return form controls

  getSubAdminDetails() {
    this._subAdmin.getSubAdminDetail({ subAdminId: this.subAdminId }).subscribe((res: SubAdmin.SubAdminDetail) => {
      if (res.statusCode == 200) {
        this.subAdminDetails = res.data;
        this.subAdminForm.patchValue(this.subAdminDetails);
        const existingSectionIds = [];
        this.subAdminDetails.permission.forEach((permission, index) => {
          existingSectionIds.push(permission.sectionId);
          this.addPermission(permission);
          this.CheckBoxListener({ checked: permission.view }, index);
        });

        const nonExistingPermissions = PERMISSION.filter(item => existingSectionIds.indexOf(item.sectionId) < 0)

        if (nonExistingPermissions.length) {
          this.subAdminForm.markAsDirty();
          nonExistingPermissions.forEach((permission) => {
            this.addNewPermission(permission);
          });
        }
      }
    })
  }

  allPermissionCheckBoxListener(event: any, index: number, moduleName?) {
    let controls: any = this.permissionByIndex(index)['controls'];
    if (moduleName == this.manageTypeValue.CATEGORIES ||
      moduleName == this.manageTypeValue.REWARDS ||
      moduleName == this.manageTypeValue.BADGES ||
      moduleName == this.manageTypeValue.CLIENTS ||
      moduleName == this.manageTypeValue.CLUBS
    ) {
      controls.view.setValue(true); //if select/deselect all
    } else {
      controls.view.setValue(event.checked);
    }
    controls.deleteBlock.setValue(event.checked);
    controls.addEdit.setValue(event.checked);
    controls.exportReport.setValue(event.checked);

    if (!controls.all.value) {
      if (!controls.view.value) {
        controls.addEdit.disable();
        controls.deleteBlock.disable();
        controls.exportReport.disable();
      }
    } else {
      controls.addEdit.enable();
      controls.deleteBlock.enable();
      controls.exportReport.enable();
    }
  }

  CheckBoxListener(event: any, index: number, moduleName?) {
    let controls: any = this.permissionByIndex(index)['controls'];
    if (moduleName == this.manageTypeValue.CATEGORIES ||
      moduleName == this.manageTypeValue.REWARDS ||
      moduleName == this.manageTypeValue.BADGES ||
      moduleName == this.manageTypeValue.CLIENTS ||
      moduleName == this.manageTypeValue.CLUBS
    ) {
      controls.view.setValue(true); //if someone try to change view permission from console
    } else {
      if (event.checked) {
        controls.addEdit.enable();
        controls.deleteBlock.enable();
        controls.exportReport.enable();

        if (controls.exportReport.value && controls.addEdit.value && controls.deleteBlock.value && controls.view.value) {
          controls.all.setValue(true);
        }
      } else {
        controls.all.setValue(false);
        if (!controls.view.value) {
          controls.addEdit.setValue(false);
          controls.deleteBlock.setValue(false);
          controls.addEdit.disable();
          controls.exportReport.disable();
          controls.deleteBlock.disable();
        }
      }
    }
  }

  subAdminHandler() {
    this.trimValues();
    if (this.subAdminForm.valid) {
      let formValue = this.subAdminForm.value;
      formValue.permission.forEach(element => {
        if (!element.view) {
          element['addEdit'] = false;
          element['deleteBlock'] = false;
          element['exportReport'] = false;
        }
      });
      console.log("formData", formValue);

      if (this.subAdminId) {
        if (this.subAdminForm.dirty) {
          this.updateSubAdminDetails(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewSubAdmin(formValue);
      }
    }
  }

  addNewSubAdmin(formValue: any) {
    this._subAdmin.addSubAdmin(formValue).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateSubAdminDetails(formValue: any) {
    formValue['subAdminId'] = this.subAdminId;
    this._subAdmin.updateSubAdmin(formValue).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  trimValues() {
    for (const key in this.subAdminForm.value) {
      if (this.subAdminForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
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
    this._router.navigate([SUB_ADMINS]);
  }

}
