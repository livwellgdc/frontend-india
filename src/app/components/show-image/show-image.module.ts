import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowImageComponent } from './show-image.component';
import { MatDialogModule } from '@angular/material';
import { LazyImageModule } from '../lazy-image/lazy-image.module';

@NgModule({
  declarations: [ShowImageComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    LazyImageModule
  ],
  entryComponents: [ShowImageComponent]
})
export class ShowImageModule { }
