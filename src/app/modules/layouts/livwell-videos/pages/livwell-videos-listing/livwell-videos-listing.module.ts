import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivwellVideosListingComponent } from './livwell-videos-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { MatCheckboxModule } from '@angular/material';

const inrRoutes: Routes = [
  {
    path: '', component: LivwellVideosListingComponent
  }
];

@NgModule({
  declarations: [LivwellVideosListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatTableRendererModule,
    MatCheckboxModule
  ]
})
export class LivwellVideosListingModule { }
