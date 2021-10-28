import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { UrboxToggleButtonComponent } from './urbox-toggle-button.component';
import { ConfirmationModalModule } from '../confirmation-modal/confirmation-modal.module';

@NgModule({
  declarations: [ UrboxToggleButtonComponent ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    ConfirmationModalModule
  ],
  exports:[ UrboxToggleButtonComponent, ]

})
export class UrboxModule { }
