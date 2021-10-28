import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/modules/accounts/_service/account.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SendCodeService } from './_service/send-code.service';

@Component({
  selector: 'lv-send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss'],
  providers: [SendCodeService]
})
export class SendCodeComponent {

  public isOtpSent: boolean = false;
  public insertForm: FormGroup;
  public email = localStorage.getItem('email');

  constructor(
    private _fb: FormBuilder,
    private _account: AccountService,
    private _storage: StorageService,
    private _sendCode: SendCodeService) { }


  ngOnInit() {
    this.createInserForm();
  }

  createInserForm() {
    this.insertForm = this._fb.group({
      provider: ['Email'],
      deviceId: [this._storage.deviceDetail(2)]
    });
    this.f2.provider.setValue('Email');
  }

  get f2() { return this.insertForm.controls };

  public sendTFACode() {
    this._sendCode.sendCode().subscribe(resp => {
      if (resp.statusCode == 200) {
        this.isOtpSent = true;
      }
      console.log(resp);
    })
  }


}
