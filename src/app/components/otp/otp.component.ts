import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SendCodeService } from '../send-code/_service/send-code.service';

@Component({
  selector: 'lv-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  providers: [SendCodeService]
})
export class OTPComponent implements OnInit {
  title = 'otp';
  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  ngOnInit() {

  }

  constructor(private _sendCode: SendCodeService, private _storage: StorageService) {
    this.form = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements) {
    const group: any = {};

    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1 ;
    } else {
      pos = index + 1 ;
    }
    if (pos > -1 && pos < this.formInput.length ) {
      this.rows._results[pos].nativeElement.focus();
    }

  }

  onSubmit() {

    if(this.form.valid) {
      var result;
      for (const property in this.form.value) {
        result = result ? result + this.form.value[property] : this.form.value[property];
      }
  
      this._sendCode.validateTwoFactorCode({ deviceId: this._storage.deviceDetail(2), tfc_code: result, userId: this._storage.adminId}).subscribe(response =>{
        this.form.reset();
        if(response.statusCode == 200) {
          this._storage.loginSuccessfully(response);
        }
        console.log(response);
      }, ()=>{
        this.form.reset();
      })
    }
  }
}
