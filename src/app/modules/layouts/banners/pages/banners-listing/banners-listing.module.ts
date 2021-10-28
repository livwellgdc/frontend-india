import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersListingComponent } from './banners-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: BannersListingComponent
  }
];

@NgModule({
  declarations: [BannersListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatTableRendererModule
  ]
})
export class BannersListingModule { }
