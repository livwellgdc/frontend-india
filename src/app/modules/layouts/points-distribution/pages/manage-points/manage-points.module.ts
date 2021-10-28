import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePointsComponent } from './manage-points.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberModule } from '../../../../../directives/number/number.module';
import { MatInputModule, MatButtonModule } from '@angular/material';

const inrRoutes: Routes = [
  {
    path: '', component: ManagePointsComponent
  }
];

@NgModule({
  declarations: [ManagePointsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    NumberModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ManagePointsModule { }
