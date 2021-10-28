import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminsDetailsComponent } from './sub-admins-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { ShowPermissionsComponent } from './_components/show-permissions/show-permissions.component';
import { SubAdminActivitiesComponent } from './_components/sub-admin-activities/sub-admin-activities.component';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: SubAdminsDetailsComponent
  }
];

@NgModule({
  declarations: [SubAdminsDetailsComponent, ShowPermissionsComponent, SubAdminActivitiesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatIconModule,
    DataLoaderModule,
    MatButtonModule,
    EmptyValueModule,
    MatTableRendererModule
  ],
  entryComponents: [ShowPermissionsComponent]
})
export class SubAdminsDetailsModule { }
