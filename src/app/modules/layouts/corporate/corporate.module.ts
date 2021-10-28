import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateComponent } from './corporate.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: CorporateComponent, children: [
      { path: '', loadChildren: () => import('./pages/corporate-list/corporate-list.module').then(m => m.CorporateListModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-corporate/add-edit-corporate.module').then(m => m.AddEditCorporateModule) },
      { path: `${EDIT}/:corporateId`, loadChildren: () => import('./pages/add-edit-corporate/add-edit-corporate.module').then(m => m.AddEditCorporateModule) },
      { path: ':corporateId', loadChildren: () => import('./pages/corporate-detail/corporate-detail.module').then(m => m.CorporateDetailModule) }
    ]
  }
];


@NgModule({
  declarations: [CorporateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class CorporateModule { }
