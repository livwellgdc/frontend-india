import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { CharityDetailsComponent } from './charity-details.component';


const inrRoutes: Routes = [
  {
    path: '', component: CharityDetailsComponent
  }
];

@NgModule({
  declarations: [CharityDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    EmptyValueModule,
    FormatStatusModule,
    DataLoaderModule,
    LazyImageModule,
    MatIconModule,
    ShowDescriptionModule
  ]
})
export class CharityDetailsModule { }
