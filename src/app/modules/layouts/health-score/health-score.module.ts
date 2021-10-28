import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthScoreComponent } from './health-score.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: HealthScoreComponent, children: [
      { path: '', loadChildren: () => import('./pages/manage-health-score/manage-health-score.module').then(m => m.ManageHealthScoreModule) },
    ]
  }
];

@NgModule({
  declarations: [HealthScoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class HealthScoreModule { }
