import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatMemberShipPipe } from './format-member-ship.pipe';

@NgModule({
  declarations: [FormatMemberShipPipe],
  imports: [
    CommonModule
  ],
  exports: [FormatMemberShipPipe]
})
export class FormatMemberShipModule { }
