import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageService } from '../../../../services/storage/storage.service';
import { AccountService } from '../../_service/account.service';
import { ACCOUNT_ERROR_MESSAGES } from '../../../../constants/messages';
import { LIMIT, REGEX } from '../../../../constants/validator';
import { checkSpaceAtStartEnd } from './../../../../constants/helper';
import { SendCodeService } from 'src/app/components/send-code/_service/send-code.service';

@Component({
  selector: 'lv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SendCodeService]
})

export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  errorMsg = ACCOUNT_ERROR_MESSAGES;
  limit = LIMIT;

  @ViewChild('email', { static: true }) email: ElementRef;
  @ViewChild('pass', { static: true }) pass: ElementRef;

  public temp_token = localStorage.getItem("temp_tok");
  public isLoggedIn:boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _account: AccountService,
    private _storage: StorageService,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.pattern(REGEX.EMAIL)]],
      password: [''],
      deviceId: [this._storage.deviceDetail(2)]
    });

  }

  get f() { return this.loginForm.controls };

  trimValues() {
    for (const key in this.loginForm.value) {
      if (this.loginForm.value.hasOwnProperty(key)) {
        if (this.f[key].value && typeof (this.f[key].value) === 'string') {
          this.f[key].patchValue(this.f[key].value.trim());
        }
      }
    }
  }

  loginHandler() {
    this.logInValidation();
    if (this.loginForm.valid) {
      this.confirmLogIn();
    }
  }

  confirmLogIn() {
    this._account.logIn(this.loginForm.value).subscribe(response => {
      // this._storage.loginSuccessfully(response);
      this.isLoggedIn = true;
      this._storage.firstVerificationSuccess(response, this.f.email.value);
    }, (error) => {
      if (error) {
        if (error.statusCode == 403) {
          this.f.password.reset();
          this.pass.nativeElement.focus();
        } else if (error.statusCode == 400) {
          this.email.nativeElement.focus();
        }
      }
    });
  }

  logInValidation() {
    if (!this.f.email.valid) {
      this.email.nativeElement.focus();
      return;
    }
    if (!this.f.password.valid) {
      this.pass.nativeElement.focus();
      return;
    }
    /*------Check space---*/
    if (checkSpaceAtStartEnd(this.f.password.value)) {
      this.f.password.setErrors({ space: true });
      this.pass.nativeElement.focus();
      return;
    }
  }

  restrictPaste(e) {
    e.preventDefault();
  }
}
