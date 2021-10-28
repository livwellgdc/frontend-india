import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendCodeComponent } from './send-code.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';
import { OtpModule } from '../otp/otp.module';


@NgModule({
  declarations: [ SendCodeComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    OtpModule
  ],
  exports: [ SendCodeComponent ]

})
export class SendCodeModule { }
