import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListingComponent } from './payment-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: PaymentListingComponent
  }
];

@NgModule({
  declarations: [PaymentListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule
  ]
})
export class PaymentListingModule { }
