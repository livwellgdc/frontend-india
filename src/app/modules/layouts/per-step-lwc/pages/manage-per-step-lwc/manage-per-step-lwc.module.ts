import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePerStepLwcComponent } from './manage-per-step-lwc.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { DigitOnlyWithDecimalModule } from '../../../../../directives/digit-only-with-decimal/digit-only-with-decimal.module';

const inrRoutes: Routes = [
  {
    path: '', component: ManagePerStepLwcComponent
  }
];

@NgModule({
  declarations: [ManagePerStepLwcComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    DigitOnlyWithDecimalModule
  ]
})
export class ManagePerStepLwcModule { }
