import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLivwellVideosComponent } from './add-edit-livwell-videos.component';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberModule } from '../../../../../directives/number/number.module';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditLivwellVideosComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.LIVWELL_VIDEOS }
  }
];

@NgModule({
  declarations: [AddEditLivwellVideosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    NumberModule
  ]
})
export class AddEditLivwellVideosModule { }
