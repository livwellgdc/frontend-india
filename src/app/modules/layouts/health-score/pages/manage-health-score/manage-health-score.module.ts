import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageHealthScoreComponent } from './manage-health-score.component';
import { NumberModule } from '../../../../../directives/number/number.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';

const inrRoutes: Routes = [
  {
    path: '', component: ManageHealthScoreComponent
  }
];

@NgModule({
  declarations: [ManageHealthScoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NumberModule
  ]
})
export class ManageHealthScoreModule { }
