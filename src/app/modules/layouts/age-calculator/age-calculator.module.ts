import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeCalculatorComponent } from './age-calculator.component';
import { Routes, RouterModule } from '@angular/router';
import { EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: AgeCalculatorComponent, children: [
      { path: '', loadChildren: () => import('./pages/age-cal-questions/age-cal-questions.module').then(m => m.AgeCalQuestionsModule) },
      { path: `${EDIT}/:questionId`, loadChildren: () => import('./pages/edit-age-questions/edit-age-questions.module').then(m => m.EditAgeQuestionsModule) }
    ]
  }
];

@NgModule({
  declarations: [AgeCalculatorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class AgeCalculatorModule { }
