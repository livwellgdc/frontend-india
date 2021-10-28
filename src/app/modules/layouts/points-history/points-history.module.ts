import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsHistoryComponent } from './points-history.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: PointsHistoryComponent, children: [
      { path: '', loadChildren: () => import('./pages/points-history-list/points-history-list.module').then(m => m.PointsHistoryListModule) },
    ]
  }
];

@NgModule({
  declarations: [PointsHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class PointsHistoryModule { }
