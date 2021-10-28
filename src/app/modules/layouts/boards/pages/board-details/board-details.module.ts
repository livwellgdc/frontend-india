import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardDetailsComponent } from './board-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';

const inrRoutes: Routes = [
  {
    path: '', component: BoardDetailsComponent
  }
];

@NgModule({
  declarations: [BoardDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    EmptyValueModule,
    MatIconModule,
    LazyImageModule,
    ShowDescriptionModule,
    DataLoaderModule,
    FormatStatusModule
  ]
})
export class BoardDetailsModule { }
