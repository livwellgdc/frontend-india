import { SafeModule } from './../../pipes/safe/safe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesUploadComponent } from './files-upload.component';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [FilesUploadComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SafeModule
  ],
  exports: [
    FilesUploadComponent
  ]
})
export class FilesUploadModule { }
