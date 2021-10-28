import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { SafeModule } from './../../../../../pipes/safe/safe.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    SafeModule,
    DataLoaderModule
  ],
  exports: [
    EditorComponent,
    SafeModule,
    DataLoaderModule
  ]
})
export class EditorModule { }
