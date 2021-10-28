import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDescriptionComponent } from './show-description.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [ShowDescriptionComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  entryComponents: [ShowDescriptionComponent]
})
export class ShowDescriptionModule { }
