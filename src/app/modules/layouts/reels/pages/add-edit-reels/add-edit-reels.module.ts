import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { LazyImageModule } from './../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { NumberModule } from '../../../../../directives/number/number.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AddEditReelsComponent } from './add-edit-reels.component';
import { LazyVideoModule } from 'src/app/components/lazy-video/lazy-video.module';

const inrRoute: Routes = [
  {
    path: '', component: AddEditReelsComponent,
    // canActivate: [PreventAddEditGuard],
    // data: { roles: SECTION_ID_OF.STORIES }
  }
]

@NgModule({
  declarations: [AddEditReelsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoute),
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    LazyImageModule,
    CropperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NumberModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    LazyVideoModule
  ]
})
export class AddEditReelsModule { }
