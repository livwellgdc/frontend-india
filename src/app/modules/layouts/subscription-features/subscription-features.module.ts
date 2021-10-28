import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionFeaturesComponent } from './subscription-features.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from 'src/app/constants/routes';

const innerRoutes: Routes = [
  { 
    path:"", component: SubscriptionFeaturesComponent, children : [
      { path: "", loadChildren: () => import("./pages/subscription-features-list/subscription-features-list.module").then(m => m.SubscriptionFeaturesListModule) },
      { path: ADD, loadChildren: () => import("./pages/add-edit-subscription-features/add-edit-subscription-features.module").then(m => m.AddEditSubscriptionFeaturesModule)},
      { path: `${EDIT}/:subscriptionFeatureId`, loadChildren: () => import("./pages/add-edit-subscription-features/add-edit-subscription-features.module").then(m => m.AddEditSubscriptionFeaturesModule)},
    ]
  }
]

@NgModule({
  declarations: [SubscriptionFeaturesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes)
  ]
})
export class SubscriptionFeaturesModule { }
