import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterReasonComponent } from './enter-reason.component';
import { MatIconModule, MatInputModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EnterReasonComponent],
  imports: [CommonModule, MatIconModule, MatInputModule, MatDialogModule, FormsModule, MatButtonModule],
  exports: [EnterReasonComponent],
  entryComponents: [EnterReasonComponent]
})
export class EnterReasonModule { }
