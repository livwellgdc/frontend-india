import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: PaymentsComponent, children: [
      { path: '', loadChildren: () => import('./pages/payment-listing/payment-listing.module').then(m => m.PaymentListingModule) },
      { path: ':transactionId', loadChildren: () => import('./pages/payment-details/payment-details.module').then(m => m.PaymentDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class PaymentsModule { }
