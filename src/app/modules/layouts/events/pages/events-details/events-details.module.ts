import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsDetailsComponent } from './events-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';

const inrRoutes: Routes = [
  {
    path: '', component: EventsDetailsComponent
  }
];

@NgModule({
  declarations: [EventsDetailsComponent],
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
export class EventsDetailsModule { }
