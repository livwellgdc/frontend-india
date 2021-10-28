import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqDetailsComponent } from './faq-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { SafeModule } from '../../../../../pipes/safe/safe.module';

const inrRoutes: Routes = [
  {
    path: '', component: FaqDetailsComponent
  }
];

@NgModule({
  declarations: [FaqDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EmptyValueModule,
    DataLoaderModule,
    MatIconModule,
    MatButtonModule,
    SafeModule
  ]
})
export class FaqDetailsModule { }
