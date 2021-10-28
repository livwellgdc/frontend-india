import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersDetailsComponent } from './banners-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';

const inrRoutes: Routes = [
  {
    path: '', component: BannersDetailsComponent
  }
];

@NgModule({
  declarations: [BannersDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    MatButtonModule,
    EmptyValueModule,
    DataLoaderModule,
    LazyImageModule,
    MatIconModule
  ]
})
export class BannersDetailsModule { }
