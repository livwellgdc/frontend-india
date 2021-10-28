import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditBadgesComponent } from './add-edit-badges.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { LazyImageModule } from './../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberModule } from '../../../../../directives/number/number.module';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';


const inrRoutes: Routes = [
  {
    path: '', component: AddEditBadgesComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.BADGES }
  }
];

@NgModule({
  declarations: [AddEditBadgesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    NumberModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    LazyImageModule,
    CropperModule,
    ReactiveFormsModule,
  ]
})
export class AddEditBadgesModule { }
