import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionsDetailsComponent } from './versions-details.component';
import { Routes, RouterModule } from '@angular/router';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';

const inrRoutes: Routes = [
  {
    path: '', component: VersionsDetailsComponent
  }
];

@NgModule({
  declarations: [VersionsDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EmptyValueModule,
    DataLoaderModule,
    FormatStatusModule,
    ShowDescriptionModule,
  ]
})
export class VersionsDetailsModule { }
