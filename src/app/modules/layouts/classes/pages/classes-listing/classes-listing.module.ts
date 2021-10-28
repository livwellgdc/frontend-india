import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesListingComponent } from './classes-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { EnterReasonModule } from '../../../../../components/enter-reason/enter-reason.module';
import { SelectSearchModule } from '../../../../../components/select-search/select-search.module';

const inrRoutes: Routes = [
  {
    path: '', component: ClassesListingComponent
  }
];

@NgModule({
  declarations: [ClassesListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatTableRendererModule,
    EnterReasonModule,
    SelectSearchModule
  ],
})
export class ClassesListingModule { }
