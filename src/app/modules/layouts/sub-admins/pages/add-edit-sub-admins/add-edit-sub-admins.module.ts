import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditSubAdminsComponent } from './add-edit-sub-admins.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatCheckboxModule } from '@angular/material';
import { PreventKeysModule } from '../../../../../directives/prevent-keys/prevent-keys.module';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditSubAdminsComponent
  }
];

@NgModule({
  declarations: [AddEditSubAdminsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    PreventKeysModule,
    MatCheckboxModule
  ]
})
export class AddEditSubAdminsModule { }
