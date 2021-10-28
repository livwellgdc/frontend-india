import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerStepLwcComponent } from './per-step-lwc.component';
import { RouterModule, Routes } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: PerStepLwcComponent, children: [
      { path: '', loadChildren: () => import('./pages/manage-per-step-lwc/manage-per-step-lwc.module').then(m => m.ManagePerStepLwcModule) },
    ]
  }
];

@NgModule({
  declarations: [PerStepLwcComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class PerStepLwcModule { }
