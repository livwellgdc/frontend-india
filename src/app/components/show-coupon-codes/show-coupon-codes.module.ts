import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCouponCodesComponent } from './show-coupon-codes.component';
import { MatDialogModule } from '@angular/material';
import { FormatMemberShipModule } from '../../pipes/format-member-ship/format-member-ship.module';

@NgModule({
  declarations: [ShowCouponCodesComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormatMemberShipModule
  ],
  entryComponents: [ShowCouponCodesComponent]
})
export class ShowCouponCodesModule { }
