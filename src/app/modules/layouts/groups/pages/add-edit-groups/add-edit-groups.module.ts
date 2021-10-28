import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditGroupsComponent } from './add-edit-groups.component';
import { Routes, RouterModule } from '@angular/router';
import { NumberModule } from '../../../../../directives/number/number.module';
import { MatCardModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { ReactiveFormsModule } from '@angular/forms';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditGroupsComponent
  }
];

@NgModule({
  declarations: [AddEditGroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    NumberModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    LazyImageModule,
    CropperModule,
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class AddEditGroupsModule { }
