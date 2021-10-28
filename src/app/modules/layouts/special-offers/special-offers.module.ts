import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialOffersComponent } from './special-offers.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: SpecialOffersComponent, children: [
      { path: '', loadChildren: () => import('./pages/offer-listing/offer-listing.module').then(m => m.OfferListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-offers/add-edit-offers.module').then(m => m.AddEditOffersModule) },
      { path: `${EDIT}/:offerId`, loadChildren: () => import('./pages/add-edit-offers/add-edit-offers.module').then(m => m.AddEditOffersModule) },
      { path: ':offerId', loadChildren: () => import('./pages/offer-details/offer-details.module').then(m => m.OfferDetailsModule) }
    ]
  }
];


@NgModule({
  declarations: [SpecialOffersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class SpecialOffersModule { }
