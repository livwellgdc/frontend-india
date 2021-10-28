import { SelectSearchModule } from './../select-search/select-search.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCountryComponent } from './select-country.component';

@NgModule({
  declarations: [SelectCountryComponent],
  imports: [
    CommonModule,
    FormsModule,
    SelectSearchModule,
    MatSelectModule,
  ],
  exports: [
    FormsModule,
    MatSelectModule,
    SelectCountryComponent
  ]
})
export class SelectCountryModule { }
