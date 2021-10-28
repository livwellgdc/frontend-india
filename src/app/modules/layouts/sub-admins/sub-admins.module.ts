import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminsComponent } from './sub-admins.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: SubAdminsComponent, children: [
      { path: '', loadChildren: () => import('./pages/sub-admins-listing/sub-admins-listing.module').then(m => m.SubAdminsListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-sub-admins/add-edit-sub-admins.module').then(m => m.AddEditSubAdminsModule) },
      { path: `${EDIT}/:subAdminId`, loadChildren: () => import('./pages/add-edit-sub-admins/add-edit-sub-admins.module').then(m => m.AddEditSubAdminsModule) },
      { path: ':subAdminId', loadChildren: () => import('./pages/sub-admins-details/sub-admins-details.module').then(m => m.SubAdminsDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [SubAdminsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class SubAdminsModule { }
