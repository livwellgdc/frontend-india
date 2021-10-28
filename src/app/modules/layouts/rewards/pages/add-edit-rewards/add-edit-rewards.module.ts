import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditRewardsComponent } from './add-edit-rewards.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { NumberModule } from '../../../../../directives/number/number.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { ShowCouponCodesModule } from '../../../../../components/show-coupon-codes/show-coupon-codes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';


const inrRoutes: Routes = [
  {
    path: '', component: AddEditRewardsComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.REWARDS }
  }
];

@NgModule({
  declarations: [AddEditRewardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    LazyImageModule,
    CropperModule,
    NumberModule,
    MatCheckboxModule,
    MatRadioModule,
    ShowCouponCodesModule
  ]
})
export class AddEditRewardsModule { }
