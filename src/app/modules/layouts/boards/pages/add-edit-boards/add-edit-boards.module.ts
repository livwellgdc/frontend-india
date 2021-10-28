import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditBoardsComponent } from './add-edit-boards.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditBoardsComponent
  }
];

@NgModule({
  declarations: [AddEditBoardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    LazyImageModule,
    MatCardModule,
    CropperModule
  ]
})
export class AddEditBoardsModule { }
