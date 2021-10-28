import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../_service/account.service';
import { ActivatedRoute } from '@angular/router';
import { LIMIT, REGEX } from '../../../../constants/validator';
import { PASSWORD_ERROR_MESSAGES } from '../../../../constants/messages';
import { checkSpaceAtStartEnd } from '../../../../constants/helper';
import { SuccessPopupService } from '../../../../components/success-popup/success-popup.service';
import { ACCOUNT } from '../../../../constants/routes';

@Component({
  selector: 'lv-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss', '../../pages/login/login.component.scss']
})
export class ResetComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  resetForm: FormGroup;
  limit = LIMIT;
  errorMsg = PASSWORD_ERROR_MESSAGES;

  @ViewChild('pass', { static: true }) pass: ElementRef;
  @ViewChild('cPass', { static: true }) cPass: ElementRef;

  constructor(
    private _fb: FormBuilder,
    private _account: AccountService,
    private _actRoute: ActivatedRoute,
    private _success: SuccessPopupService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resetForm = this._fb.group({
      password: ['', [Validators.pattern(REGEX.PASSWORD)]],
      confirmPassword: ['', [Validators.pattern(REGEX.PASSWORD)]]
    });
  }

  get f() { return this.resetForm.controls; }

  resetHandler() {
    this.resetValidations();
    if (this.resetForm.valid) {
      const resetObj = {
        token: this._actRoute.snapshot.params['token'],
        password: this.f.password.value
      }
      this._account.resetPassword(resetObj).subscribe((response: any) => {
        if (response.statusCode == 200) {
          this._success.successBox(null, response.message, ACCOUNT, "LOGIN");
        }
      })
    }
  }

  resetValidations() {
    if (!this.f.password.valid) {
      this.pass.nativeElement.focus();
      return
    }
    /*------Check space---*/
    if (checkSpaceAtStartEnd(this.f.password.value)) {
      this.f.password.setErrors({ space: true });
      this.pass.nativeElement.focus();
      return;
    }
    if (!this.f.confirmPassword.valid) {
      this.cPass.nativeElement.focus()
      return
    }
    /*------Check space---*/
    if (checkSpaceAtStartEnd(this.f.confirmPassword.value)) {
      this.f.confirmPassword.setErrors({ space: true });
      this.cPass.nativeElement.focus();
      return;
    }
    if (this.f.confirmPassword.value != this.f.password.value) {
      this.f.confirmPassword.reset();
      this.cPass.nativeElement.focus();
      this.f.confirmPassword.setErrors({ 'notMatch': true });
      return
    }
  }

}
