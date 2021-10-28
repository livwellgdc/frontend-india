import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const inrRoutes: Routes = [
  { path: '', component: ChangePasswordComponent }
];


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class ChangePasswordModule { }
