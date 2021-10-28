import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeCalQuestionsComponent } from './age-cal-questions.component';
import { Routes, RouterModule } from '@angular/router';
import { MatDialogModule, MatCardModule, MatIconModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { ResultNotFoundModule } from '../../../../../components/result-not-found/result-not-found.module';

const inrRoutes: Routes = [
  {
    path: '', component: AgeCalQuestionsComponent
  }
];

@NgModule({
  declarations: [AgeCalQuestionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    EmptyValueModule,
    DataLoaderModule,
    ResultNotFoundModule
  ]
})
export class AgeCalQuestionsModule { }
