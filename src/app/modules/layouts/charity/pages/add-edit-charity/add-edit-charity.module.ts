import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { LazyImageModule } from './../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { NumberModule } from '../../../../../directives/number/number.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { AddEditCharityComponent } from './add-edit-charity.component';
import { PreventKeysModule } from 'src/app/directives/prevent-keys/prevent-keys.module';
import { GoogleMapModule } from 'src/app/components/google-map/google-map.module';

const inrRoute: Routes = [
  {
    path: '', component: AddEditCharityComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.CHARITY }
  }
]

@NgModule({
  declarations: [AddEditCharityComponent],
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
    PreventKeysModule,
    GoogleMapModule
  ]
})
export class AddEditCharityModule { }
