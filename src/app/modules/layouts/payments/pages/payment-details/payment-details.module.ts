import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDetailsComponent } from './payment-details.component';
import { Routes, RouterModule } from '@angular/router';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';

const inrRoutes: Routes = [
  {
    path: '', component: PaymentDetailsComponent
  }
];

@NgModule({
  declarations: [PaymentDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EmptyValueModule,
    DataLoaderModule,
    FormatStatusModule
  ]
})
export class PaymentDetailsModule { }
