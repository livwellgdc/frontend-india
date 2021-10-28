import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsHistoryListComponent } from './points-history-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: PointsHistoryListComponent
  }
];

@NgModule({
  declarations: [PointsHistoryListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule
  ]
})
export class PointsHistoryListModule { }
