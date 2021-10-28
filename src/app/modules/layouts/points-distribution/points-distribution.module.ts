import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsDistributionComponent } from './points-distribution.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: PointsDistributionComponent, children: [
      { path: '', loadChildren: () => import('./pages/manage-points/manage-points.module').then(m => m.ManagePointsModule) },
    ]
  }
];

@NgModule({
  declarations: [PointsDistributionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class PointsDistributionModule { }
