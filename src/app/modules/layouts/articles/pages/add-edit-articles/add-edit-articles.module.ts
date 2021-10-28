import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditArticlesComponent } from './add-edit-articles.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditArticlesComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.ARTICLES }
  }
];

@NgModule({
  declarations: [AddEditArticlesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    LazyImageModule,
    MatCheckboxModule,
    CropperModule
  ]
})
export class AddEditArticlesModule { }
