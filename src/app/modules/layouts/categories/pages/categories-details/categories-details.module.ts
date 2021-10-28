import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesDetailsComponent } from './categories-details.component';
import { Routes, RouterModule } from '@angular/router';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';

const inrRoutes: Routes = [
  {
    path: '', component: CategoriesDetailsComponent
  }
];

@NgModule({
  declarations: [CategoriesDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EmptyValueModule,
    FormatStatusModule,
    DataLoaderModule,
    LazyImageModule,
    ShowDescriptionModule
  ]
})
export class CategoriesDetailsModule { }
