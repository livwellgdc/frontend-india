import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesComponent } from './badges.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';


const inrRoutes: Routes = [
  {
    path: '', component: BadgesComponent, children: [
      { path: '', loadChildren: () => import('./pages/badges-listing/badges-listing.module').then(m => m.BadgesListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-badges/add-edit-badges.module').then(m => m.AddEditBadgesModule) },
      { path: `${EDIT}/:badgeId`, loadChildren: () => import('./pages/add-edit-badges/add-edit-badges.module').then(m => m.AddEditBadgesModule) },
      { path: ':badgeId', loadChildren: () => import('./pages/badges-details/badges-details.module').then(m => m.BadgesDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [BadgesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class BadgesModule { }
