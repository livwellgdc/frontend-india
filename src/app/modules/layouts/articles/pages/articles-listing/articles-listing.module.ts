import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListingComponent } from './articles-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { MatCheckboxModule } from '@angular/material';

const inrRoutes: Routes = [
  {
    path: '', component: ArticlesListingComponent
  }
];

@NgModule({
  declarations: [ArticlesListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule,
    MatCheckboxModule
  ]
})
export class ArticlesListingModule { }
