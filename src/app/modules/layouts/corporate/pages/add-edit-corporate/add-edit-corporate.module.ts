import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditCorporateComponent } from './add-edit-corporate.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatIconModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { NumberModule } from '../../../../../directives/number/number.module';
import { LazyImageModule } from '../../../../../components/lazy-image/lazy-image.module';
import { PreventKeysModule } from '../../../../../directives/prevent-keys/prevent-keys.module';
import { GoogleMapModule } from '../../../../../components/google-map/google-map.module';
import { CropperModule } from '../../../../../components/cropper/cropper.module';
import { SelectCountryModule } from '../../../../../components/select-country/select-country.module';
import { SelectSearchModule } from '../../../../../components/select-search/select-search.module';
import { SuccessPopupModule } from '../../../../../components/success-popup/success-popup.module';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditCorporateComponent,
  }
];

@NgModule({
  declarations: [AddEditCorporateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    NumberModule,
    MatIconModule,
    LazyImageModule,
    PreventKeysModule,
    GoogleMapModule,
    CropperModule,
    SelectCountryModule,
    MatNativeDateModule,
    MatDatepickerModule,
    SelectSearchModule,
    SuccessPopupModule
  ]
})
export class AddEditCorporateModule { }
