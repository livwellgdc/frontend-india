import { NgModule } from '@angular/core';
import { FormatStatusModule } from './../../../../../pipes/format-status/format-status.module';
import { EmptyValueModule } from './../../../../../pipes/empty-value/empty-value.module';
import { CommonModule } from '@angular/common';
import { RewardsDetailsComponent } from './rewards-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { MatTableRendererModule } from './../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { ShowCouponCodesModule } from '../../../../../components/show-coupon-codes/show-coupon-codes.module';
import { RewardRedeemedUsersComponent } from './_components/reward-redeemed-users/reward-redeemed-users.component';
import { RewardsService } from '../../_service/rewards.service';

const inrRoutes: Routes = [
  {
    path: '', component: RewardsDetailsComponent
  }
];

@NgModule({
  declarations: [RewardsDetailsComponent, RewardRedeemedUsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    EmptyValueModule,
    FormatStatusModule,
    DataLoaderModule,
    LazyImageModule,
    MatIconModule,
    MatMenuModule,
    MatTableRendererModule,
    ShowDescriptionModule,
    ShowCouponCodesModule
  ],
  providers: [RewardsService]
})
export class RewardsDetailsModule { }
