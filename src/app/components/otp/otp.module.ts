import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OTPComponent } from './otp.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ OTPComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [OTPComponent]
})
export class OtpModule { }
