import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoComponent } from './promo.component';
import { RouterModule, Routes } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: PromoComponent, children: [
      { path: '', loadChildren: () => import('./pages/promo-mgmt/promo-mgmt.module').then(m => m.PromoMgmtModule) },
    ]
  }
];

@NgModule({
  declarations: [PromoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class PromoModule { }
