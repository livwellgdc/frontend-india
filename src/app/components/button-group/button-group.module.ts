import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent } from './button-group.component';
import { MatButtonToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from '../mat-table-renderer/filter/filter.module';
import { SearchRendererModule } from '../search-renderer/search-renderer.module';

@NgModule({
  declarations: [ ButtonGroupComponent ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    FilterModule,
    SearchRendererModule
  ],
  exports:[ ButtonGroupComponent, MatButtonToggleModule]
})
export class ButtonGroupModule { }
