import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListingComponent } from './group-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: GroupListingComponent
  }
];

@NgModule({
  declarations: [GroupListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule
  ]
})
export class GroupListingModule { }
