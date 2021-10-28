import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInterestComponent } from './profile-interest.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: ProfileInterestComponent, children: [
      { path: '', loadChildren: () => import('./pages/profile-interest-listing/profile-interest-listing.module').then(m => m.ProfileInterestListingModule) },
      { path: ':interestId', loadChildren: () => import('./pages/profile-interest-details/profile-interest-details.module').then(m => m.ProfileInterestDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [ProfileInterestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class ProfileInterestModule { }
