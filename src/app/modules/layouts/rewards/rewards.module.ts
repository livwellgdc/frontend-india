import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsComponent } from './rewards.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: RewardsComponent, children: [
      { path: '', loadChildren: () => import('./pages/rewards-listing/rewards-listing.module').then(m => m.RewardsListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-rewards/add-edit-rewards.module').then(m => m.AddEditRewardsModule) },
      { path: `${EDIT}/:rewardId`, loadChildren: () => import('./pages/add-edit-rewards/add-edit-rewards.module').then(m => m.AddEditRewardsModule) },
      { path: ':rewardId', loadChildren: () => import('./pages/rewards-details/rewards-details.module').then(m => m.RewardsDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [RewardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class RewardsModule { }
