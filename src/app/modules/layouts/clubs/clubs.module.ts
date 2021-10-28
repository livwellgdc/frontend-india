import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsComponent } from './clubs.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: ClubsComponent, children: [
      { path: '', loadChildren: () => import('./pages/clubs-listing/clubs-listing.module').then(m => m.ClubsListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-clubs/add-edit-clubs.module').then(m => m.AddEditClubsModule) },
      { path: `${EDIT}/:clubId`, loadChildren: () => import('./pages/add-edit-clubs/add-edit-clubs.module').then(m => m.AddEditClubsModule) },
      { path: ':clubId', loadChildren: () => import('./pages/clubs-details/clubs-details.module').then(m => m.ClubsDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [ClubsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class ClubsModule { }
