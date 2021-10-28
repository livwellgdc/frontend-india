import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListingComponent } from './board-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: BoardListingComponent
  }
];

@NgModule({
  declarations: [BoardListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule
  ]
})
export class BoardListingModule { }
