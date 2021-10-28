import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInterestListingComponent } from './profile-interest-listing.component';
import { AddEditProfileInterestComponent } from '../../_components/add-edit-profile-interest/add-edit-profile-interest.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { MatDialogModule } from '@angular/material';
import { ProfileInterestService } from '../../_service/profile-interest.service';

const inrRoutes: Routes = [
  {
    path: '', component: ProfileInterestListingComponent
  }
];

@NgModule({
  declarations: [ProfileInterestListingComponent, AddEditProfileInterestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatTableRendererModule,
    MatDialogModule,
    LazyImageModule,
    CropperModule
  ],
  providers: [ProfileInterestService],
  entryComponents: [AddEditProfileInterestComponent]
})
export class ProfileInterestListingModule { }
