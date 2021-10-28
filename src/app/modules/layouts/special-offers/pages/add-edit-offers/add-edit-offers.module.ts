import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditOffersComponent } from './add-edit-offers.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
import { NumberModule } from '../../../../../directives/number/number.module';
import { ShowCouponCodesModule } from '../../../../../components/show-coupon-codes/show-coupon-codes.module';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditOffersComponent
  }
];

@NgModule({
  declarations: [AddEditOffersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    NumberModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ShowCouponCodesModule,
    MatSelectModule
  ]
})
export class AddEditOffersModule { }
