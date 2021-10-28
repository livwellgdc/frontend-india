import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { SuccessPopupComponent } from './success-popup.component';
import { RouterModule } from '@angular/router';
import { SuccessPopupService } from './success-popup.service';

@NgModule({
  declarations: [SuccessPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  entryComponents: [SuccessPopupComponent],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SuccessPopupComponent,
  ],
  providers: [SuccessPopupService]
})
export class SuccessPopupModule { }
