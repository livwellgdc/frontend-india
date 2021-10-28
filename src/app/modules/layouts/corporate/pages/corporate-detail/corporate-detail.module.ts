import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateDetailComponent } from './corporate-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';

const inrRoutes: Routes = [
  {
    path: '', component: CorporateDetailComponent
  }
];

@NgModule({
  declarations: [CorporateDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    EmptyValueModule,
    MatIconModule,
    LazyImageModule,
    ShowDescriptionModule,
    DataLoaderModule,
    FormatStatusModule,
    MatProgressBarModule
  ]
})
export class CorporateDetailModule { }
