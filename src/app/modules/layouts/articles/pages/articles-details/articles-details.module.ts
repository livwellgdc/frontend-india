import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesDetailsComponent } from './articles-details.component';
import { Routes, RouterModule } from '@angular/router';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';

const inrRoutes: Routes = [
  {
    path: '', component: ArticlesDetailsComponent
  }
];

@NgModule({
  declarations: [ArticlesDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    MatButtonModule,
    EmptyValueModule,
    DataLoaderModule,
    LazyImageModule,
    MatIconModule,
    ShowDescriptionModule
  ]
})
export class ArticlesDetailsModule { }
