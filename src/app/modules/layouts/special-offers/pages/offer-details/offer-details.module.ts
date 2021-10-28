import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferDetailsComponent } from './offer-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';
import { ShowCouponCodesModule } from '../../../../../components/show-coupon-codes/show-coupon-codes.module';

const inrRoutes: Routes = [
  {
    path: '', component: OfferDetailsComponent
  }
];

@NgModule({
  declarations: [OfferDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    EmptyValueModule,
    DataLoaderModule,
    MatIconModule,
    FormatStatusModule,
    ShowCouponCodesModule
  ]
})
export class OfferDetailsModule { }
