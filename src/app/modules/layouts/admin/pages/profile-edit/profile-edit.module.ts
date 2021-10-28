import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from './profile-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { PreventKeysModule } from '../../../../../directives/prevent-keys/prevent-keys.module';

const inrRoutes: Routes = [
  { path: '', component: ProfileEditComponent }
];


@NgModule({
  declarations: [ProfileEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    PreventKeysModule
  ]
})
export class ProfileEditModule { }
