import { MatIconModule, MatButtonModule, MatFormFieldModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { UploadPopupComponent } from './upload-popup/upload-popup.component';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from './image-cropper/image-cropper.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  declarations: [UploadPopupComponent],
  entryComponents: [UploadPopupComponent],
})
export class CropperModule { }
