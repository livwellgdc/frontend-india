import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminsListingComponent } from './sub-admins-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { EnterReasonModule } from '../../../../../components/enter-reason/enter-reason.module';

const inrRoutes: Routes = [
  {
    path: '', component: SubAdminsListingComponent
  }
];

@NgModule({
  declarations: [SubAdminsListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule,
    EnterReasonModule
  ]
})
export class SubAdminsListingModule { }
