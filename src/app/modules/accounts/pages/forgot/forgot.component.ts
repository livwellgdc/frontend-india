import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../_service/account.service';
import { REGEX, LIMIT } from '../../../../constants/validator';
import { ACCOUNT_ERROR_MESSAGES } from '../../../../constants/messages';
import { ACCOUNT } from '../../../../constants/routes';
import { SuccessPopupService } from '../../../../components/success-popup/success-popup.service';

@Component({
  selector: 'lv-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss', '../../pages/login/login.component.scss']
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  errorMsg = ACCOUNT_ERROR_MESSAGES;
  limit = LIMIT;
  @ViewChild('email', { static: true }) email: ElementRef;

  constructor(
    private _fb: FormBuilder,
    private _account: AccountService,
    private _success: SuccessPopupService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.forgotForm = this._fb.group({
      email: ['', [Validators.pattern(REGEX.EMAIL)]]
    });
  }

  get f() { return this.forgotForm.controls }

  trimValues() {
    for (const key in this.forgotForm.value) {
      if (this.forgotForm.value.hasOwnProperty(key)) {
        if (this.f[key].value && typeof (this.f[key].value) === 'string') {
          this.f[key].patchValue(this.f[key].value.trim());
        }
      }
    }
  }

  forgotHandler() {
    if (this.forgotForm.valid) {
      this._account.forgotPassword(this.forgotForm.value).subscribe((response: any) => {
        if (response.statusCode == 200) {
          /*--Open popup--*/
          this._success.successBox('Check Your Inbox', response.message, ACCOUNT);
        }
      }, (error) => {
        if (error.statusCode = 400) {
          this.email.nativeElement.focus();
        }
      })
    } else {
      this.email.nativeElement.focus();
    }
  }


}
