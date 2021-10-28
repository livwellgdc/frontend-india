import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAgeQuestionsComponent } from './edit-age-questions.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule } from '@angular/material';
import { NumberModule } from '../../../../../directives/number/number.module';

const inrRoutes: Routes = [
  {
    path: '', component: EditAgeQuestionsComponent
  }
];

@NgModule({
  declarations: [EditAgeQuestionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    NumberModule
  ]
})
export class EditAgeQuestionsModule { }
