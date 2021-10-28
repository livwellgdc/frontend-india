import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadOnScrollComponent } from './load-on-scroll.component';
import { MatSelectModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectSearchModule } from '../select-search/select-search.module';

@NgModule({
  declarations: [LoadOnScrollComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    SelectSearchModule,
  ],
  exports: [
    LoadOnScrollComponent,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    SelectSearchModule,
  ]
})
export class LoadOnScrollModule { }
