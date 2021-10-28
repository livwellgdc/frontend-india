import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditPostsComponent } from './add-edit-posts.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatSelectModule } from '@angular/material';
import { FilesUploadModule } from '../../../../../components/files-upload/files-upload.module';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditPostsComponent
  }
];

@NgModule({
  declarations: [AddEditPostsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FilesUploadModule
  ]
})
export class AddEditPostsModule { }
