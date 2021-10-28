import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditBannersComponent } from './add-edit-banners.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { LazyImageModule } from 'src/app/components/lazy-image/lazy-image.module';
import { CropperModule } from 'src/app/components/cropper/cropper.module';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditBannersComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.BANNERS }
  }
];

@NgModule({
  declarations: [AddEditBannersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LazyImageModule,
    CropperModule,
    MatSelectModule
  ]
})
export class AddEditBannersModule { }
