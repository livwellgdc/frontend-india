import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BC_ADMIN_EDIT } from '../../../../../constants/breadcrumb-routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { ADMIN } from '../../../../../constants/routes';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { ACCOUNT_ERROR_MESSAGES } from '../../../../../constants/messages';
import { StorageService } from '../../../../../services/storage/storage.service';
import { AdminService } from '../../_service/admin.service';

@Component({
  selector: 'lv-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  providers: [AdminService]
})
export class ProfileEditComponent implements OnInit {

  profileForm: FormGroup;
  limit = LIMIT;
  errorMsg = ACCOUNT_ERROR_MESSAGES;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _toast: ToastService,
    private _storage: StorageService,
    private _router: Router,
    private _admin: AdminService
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_ADMIN_EDIT);
    this.createForm();
    this.getAdminInfo();
  }
  createForm() {
    this.profileForm = this._fb.group({
      name: [''],
      email: ['', [Validators.pattern(REGEX.EMAIL)]],
    });
  }

  get f() { return this.profileForm.controls; }

  trimValues() {
    for (const key in this.profileForm.value) {
      if (this.profileForm.value.hasOwnProperty(key)) {
        if (this.f[key].value && typeof (this.f[key].value) === 'string') {
          this.f[key].patchValue(this.f[key].value.trim());
        }
      }
    }
  }

  getAdminInfo() {
    this._storage.getAdminDetail().then(response => {
      this.profileForm.patchValue(response);
    })
  }

  profileHandler() {
    if (!this.profileForm.dirty) {
      this.cancelHandler();
      return
    }
    if (this.profileForm.valid) {
      this._admin.updateProfile(this.profileForm.value).subscribe(res => {
        this._storage.adminDetail.name = this.profileForm.value.name;
        this._storage.adminDetail.email = this.profileForm.value.email;
        this._toast.success(res.message);
        this.cancelHandler();
      })
    }
  }

  cancelHandler() {
    this._router.navigate([ADMIN]);
  }

}
