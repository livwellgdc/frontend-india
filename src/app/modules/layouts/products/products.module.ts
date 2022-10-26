import { ADD, EDIT } from './../../../constants/routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
      { path: '', loadChildren: () => import('./pages/products-listing/products-listing.module').then(m => m.ProductsListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-product/add-edit-product.module').then(m => m.AddEditProductModule) },
      { path: `${EDIT}/:productId`, loadChildren: () => import('./pages/add-edit-product/add-edit-product.module').then(m => m.AddEditProductModule) },
      { path: ':productId', loadChildren: () => import('./pages/products-details/products-details.module').then(m => m.ProductsDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class ProductsModule { }
