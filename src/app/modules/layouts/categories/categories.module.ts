import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: CategoriesComponent, children: [
      { path: '', loadChildren: () => import('./pages/categories-listing/categories-listing.module').then(m => m.CategoriesListingModule) },
      { path: ':categoryId', loadChildren: () => import('./pages/categories-details/categories-details.module').then(m => m.CategoriesDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class CategoriesModule { }
