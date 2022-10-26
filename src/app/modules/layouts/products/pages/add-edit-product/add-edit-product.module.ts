import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditProductComponent } from './add-edit-product.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FilesUploadModule } from '../../../../../components/files-upload/files-upload.module';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatRadioModule } from '@angular/material';
import { LazyImageModule } from './../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { NumberModule } from '../../../../../directives/number/number.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';

const inrRoute: Routes = [
  {
    path: '', component: AddEditProductComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.PRODUCTS }
  }
]

@NgModule({
  declarations: [AddEditProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoute),
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    LazyImageModule,
    CropperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NumberModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatRadioModule,
    FilesUploadModule
  ]
})
export class AddEditProductModule { }
