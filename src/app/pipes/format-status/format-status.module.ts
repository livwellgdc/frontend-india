import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatStatusPipe } from './format-status.pipe';

@NgModule({
  declarations: [FormatStatusPipe],
  imports: [
    CommonModule
  ],
  exports: [FormatStatusPipe]
})
export class FormatStatusModule { }
