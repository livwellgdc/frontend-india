import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';


const inrRoutes: Routes = [
  {
    path: '', component: BannersComponent, children: [
      { path: '', loadChildren: () => import('./pages/banners-listing/banners-listing.module').then(m => m.BannersListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-banners/add-edit-banners.module').then(m => m.AddEditBannersModule) },
      { path: `${EDIT}/:bannerId`, loadChildren: () => import('./pages/add-edit-banners/add-edit-banners.module').then(m => m.AddEditBannersModule) },
      { path: ':bannerId', loadChildren: () => import('./pages/banners-details/banners-details.module').then(m => m.BannersDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [BannersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class BannersModule { }
