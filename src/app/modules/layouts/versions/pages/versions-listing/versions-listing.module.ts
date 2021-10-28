import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionsListingComponent } from './versions-listing.component';
import { AddEditVersionsComponent } from '../../_components/add-edit-versions/add-edit-versions.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { MatDialogModule } from '@angular/material';
import { VersionService } from '../../_service/version.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DigitOnlyWithDecimalModule } from '../../../../../directives/digit-only-with-decimal/digit-only-with-decimal.module';

const inrRoutes: Routes = [
  {
    path: '', component: VersionsListingComponent
  }
];

@NgModule({
  declarations: [VersionsListingComponent, AddEditVersionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule,
    MatDialogModule,
    ReactiveFormsModule,
    DigitOnlyWithDecimalModule
  ],
  providers: [VersionService],
  entryComponents: [AddEditVersionsComponent]
})
export class VersionsListingModule { }
