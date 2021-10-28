import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesDetailsComponent } from './badges-details.component';
import { Routes, RouterModule } from '@angular/router';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';


const inrRoutes: Routes = [
  {
    path: '', component: BadgesDetailsComponent
  }
];

@NgModule({
  declarations: [BadgesDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EmptyValueModule,
    DataLoaderModule,
    LazyImageModule,
    MatIconModule,
    MatButtonModule,
    ShowDescriptionModule,
    FormatStatusModule
  ]
})
export class BadgesDetailsModule { }
