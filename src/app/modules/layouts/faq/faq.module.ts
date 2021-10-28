import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: FaqComponent, children: [
      { path: '', loadChildren: () => import('./pages/faq-listing/faq-listing.module').then(m => m.FaqListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-faq/add-edit-faq.module').then(m => m.AddEditFaqModule) },
      { path: `${EDIT}/:faqId`, loadChildren: () => import('./pages/add-edit-faq/add-edit-faq.module').then(m => m.AddEditFaqModule) },
      { path: ':faqId', loadChildren: () => import('./pages/faq-details/faq-details.module').then(m => m.FaqDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class FaqModule { }
