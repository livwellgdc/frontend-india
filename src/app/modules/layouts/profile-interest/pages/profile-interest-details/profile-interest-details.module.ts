import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInterestDetailsComponent } from './profile-interest-details.component';
import { Routes, RouterModule } from '@angular/router';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';

const inrRoutes: Routes = [
  {
    path: '', component: ProfileInterestDetailsComponent
  }
];

@NgModule({
  declarations: [ProfileInterestDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EmptyValueModule,
    DataLoaderModule,
    LazyImageModule,
    FormatStatusModule
  ]
})
export class ProfileInterestDetailsModule { }
