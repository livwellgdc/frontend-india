import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDetailsComponent } from './group-details.component';
import { Routes, RouterModule } from '@angular/router';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { GroupParticipantsComponent } from './_components/group-participants/group-participants.component';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: GroupDetailsComponent
  }
];

@NgModule({
  declarations: [GroupDetailsComponent, GroupParticipantsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EmptyValueModule,
    DataLoaderModule,
    LazyImageModule,
    MatIconModule,
    MatButtonModule,
    ShowDescriptionModule,
    MatTableRendererModule,
  ]
})
export class GroupDetailsModule { }
