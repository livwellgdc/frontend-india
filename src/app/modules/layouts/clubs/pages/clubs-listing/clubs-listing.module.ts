import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsListingComponent } from './clubs-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { SelectSearchModule } from '../../../../../components/select-search/select-search.module';

const inrRoutes: Routes = [
  {
    path: '', component: ClubsListingComponent
  }
];

@NgModule({
  declarations: [ClubsListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatTableRendererModule,
    SelectSearchModule
  ]
})
export class ClubsListingModule { }
