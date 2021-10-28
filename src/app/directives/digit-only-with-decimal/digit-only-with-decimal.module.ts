import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitOnlyWithDecimalDirective } from './digit-only-with-decimal.directive';

@NgModule({
  declarations: [DigitOnlyWithDecimalDirective],
  imports: [
    CommonModule
  ],
  exports: [DigitOnlyWithDecimalDirective]
})
export class DigitOnlyWithDecimalModule { }
