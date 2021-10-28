import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditClassesComponent } from './add-edit-classes.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FilesUploadModule } from '../../../../../components/files-upload/files-upload.module';
import { SelectSearchModule } from '../../../../../components/select-search/select-search.module';
import { CsvUploadPopupComponent } from './_component/csv-upload-popup/csv-upload-popup.component';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatMenuModule, MatDialogModule } from '@angular/material';
import { NumberModule } from '../../../../../directives/number/number.module';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { SeatsArrangementModule } from '../../../../../components/seats-arrangement/seats-arrangement.module';
import { ShowImageModule } from '../../../../../components/show-image/show-image.module';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditClassesComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.CLASSES }
  }
];

@NgModule({
  declarations: [AddEditClassesComponent, CsvUploadPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NumberModule,
    FilesUploadModule,
    MatMenuModule,
    SelectSearchModule,
    MatDialogModule,
    EmptyValueModule,
    LazyImageModule,
    CropperModule,
    MatButtonModule,
    SeatsArrangementModule,
    ShowImageModule
  ],
  entryComponents: [CsvUploadPopupComponent]
})
export class AddEditClassesModule { }
