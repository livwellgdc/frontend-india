import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../_service/admin.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { BC_ADMIN_CHANGE_PASSWORD } from '../../../../../constants/breadcrumb-routes';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { PASSWORD_ERROR_MESSAGES } from '../../../../../constants/messages';
import { checkSpaceAtStartEnd } from '../../../../../constants/helper';
import { ADMIN } from '../../../../../constants/routes';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hide = true; hide1 = true; hide2 = true;
  changePasswordForm: FormGroup;
  limit = LIMIT;
  errorMsg = PASSWORD_ERROR_MESSAGES;

  @ViewChild('oPass', { static: true }) oPass: ElementRef;
  @ViewChild('pass', { static: true }) pass: ElementRef;
  @ViewChild('cPass', { static: true }) cPass: ElementRef;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_ADMIN_CHANGE_PASSWORD);
    this.createForm();
  }

  createForm() {
    this.changePasswordForm = this._fb.group({
      // oldPassword: ['', [Validators.pattern(REGEX.PASSWORD)]],
      oldPassword: [''],
      password: ['', [Validators.pattern(REGEX.PASSWORD)]],
      confirmPassword: ['', [Validators.pattern(REGEX.PASSWORD)]],
    });
  }

  get f() { return this.changePasswordForm.controls; }

  changePasswordHandler() {
    this.changePasswordValidations();
    if (this.changePasswordForm.valid) {
      this.changePasswordConfirm();
    }
  }

  changePasswordConfirm() {
    delete this.changePasswordForm.value.confirmPassword;
    this._admin.changePassword(this.changePasswordForm.value).subscribe(res => {
      this._toast.success(res.message);
      this.cancelHandler();
    }, (error) => {
      if (error.statusCode == 400) {
        this.f.oldPassword.reset();
        this.f.oldPassword.setErrors({ 'incorrect': true });
        this.oPass.nativeElement.focus();
      }
    })
  }

  changePasswordValidations() {
    if (!this.f.oldPassword.valid) {
      this.oPass.nativeElement.focus();
      return
    }
    /*------Check Space In Old Pass---*/
    if (checkSpaceAtStartEnd(this.f.oldPassword.value)) {
      this.f.oldPassword.setErrors({ space: true });
      this.oPass.nativeElement.focus();
      return;
    }

    if (!this.f.password.valid) {
      this.pass.nativeElement.focus();
      return
    }
    /*------Check Space In New Pass---*/
    if (checkSpaceAtStartEnd(this.f.password.value)) {
      this.f.password.setErrors({ space: true });
      this.pass.nativeElement.focus();
      return;
    }

    if (!this.f.confirmPassword.valid) {
      this.cPass.nativeElement.focus()
      return
    }
    /*------Check Space In Confirm Pass---*/
    if (checkSpaceAtStartEnd(this.f.confirmPassword.value)) {
      this.f.confirmPassword.setErrors({ space: true });
      this.cPass.nativeElement.focus();
      return;
    }

    /*------Match/Not-Match Pass---*/
    if (this.f.oldPassword.value == this.f.password.value) {
      this.f.password.reset();
      this.pass.nativeElement.focus();
      this.f.password.setErrors({ 'match': true });
      return
    }
    if (this.f.confirmPassword.value != this.f.password.value) {
      this.f.confirmPassword.reset();
      this.cPass.nativeElement.focus();
      this.f.confirmPassword.setErrors({ 'notMatch': true });
      return
    }
  }

  cancelHandler() {
    this._router.navigate([ADMIN]);
  }

}
