import { MatDialogModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule } from '@angular/material';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [ConfirmationModalComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  entryComponents: [ConfirmationModalComponent],
  exports: [
    MatIconModule,
    MatButtonModule
  ]
})
export class ConfirmationModalModule { }
