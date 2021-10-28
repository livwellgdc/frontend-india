import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivwellVideosDetailsComponent } from './livwell-videos-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';

const inrRoutes: Routes = [
  {
    path: '', component: LivwellVideosDetailsComponent
  }
];

@NgModule({
  declarations: [LivwellVideosDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    EmptyValueModule,
    DataLoaderModule,
    MatIconModule,
    ShowDescriptionModule,
    FormatStatusModule
  ]
})
export class LivwellVideosDetailsModule { }
