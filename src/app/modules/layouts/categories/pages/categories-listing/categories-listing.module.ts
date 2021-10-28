import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListingComponent } from './categories-listing.component';
import { AddEditCategoryComponent } from '../../_components/add-edit-category/add-edit-category.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { MatDialogModule } from '@angular/material';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { CategoryService } from '../../_service/category.service';
import {MatCheckboxModule} from '@angular/material/checkbox';

const inrRoutes: Routes = [
  {
    path: '', component: CategoriesListingComponent
  }
];

@NgModule({
  declarations: [CategoriesListingComponent, AddEditCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatTableRendererModule,
    MatDialogModule,
    LazyImageModule,
    CropperModule,
    MatCheckboxModule
  ],
  providers: [CategoryService],
  entryComponents: [AddEditCategoryComponent]
})
export class CategoriesListingModule { }
