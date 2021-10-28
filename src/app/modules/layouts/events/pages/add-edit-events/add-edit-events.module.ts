import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditEventsComponent } from './add-edit-events.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EventsService } from '../../_service/events.service';
import { GoogleMapModule } from '../../../../../components/google-map/google-map.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditEventsComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.EVENTS }
  }
];

@NgModule({
  declarations: [AddEditEventsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    GoogleMapModule,
    LazyImageModule,
    CropperModule
  ],
  providers: [EventsService]
})
export class AddEditEventsModule { }
