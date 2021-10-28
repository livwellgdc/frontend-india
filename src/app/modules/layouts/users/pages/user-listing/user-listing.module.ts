import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListingComponent } from './user-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { UserFilterComponent } from '../../_components/user-filter/user-filter.component';
import { EnterReasonModule } from '../../../../../components/enter-reason/enter-reason.module';
import { MatCheckboxModule } from '@angular/material';

const inrRoutes: Routes = [
  { path: '', component: UserListingComponent }
];

@NgModule({
  declarations: [UserListingComponent, UserFilterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule,
    EnterReasonModule,
    MatCheckboxModule
  ]
})
export class UserListingModule { }
