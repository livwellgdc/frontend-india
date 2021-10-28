import { MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResetComponent } from './reset.component';
import { SuccessPopupModule } from '../../../../components/success-popup/success-popup.module';

const inrRoute: Routes = [
  { path: '', component: ResetComponent }
];


@NgModule({
  declarations: [ResetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoute),
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    SuccessPopupModule
  ]
})
export class ResetModule { }
