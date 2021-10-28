import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditClubsComponent } from './add-edit-clubs.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule } from '@angular/material';
import { SelectSearchModule } from '../../../../../components/select-search/select-search.module';
import { GoogleMapModule } from '../../../../../components/google-map/google-map.module';
import { NumberModule } from '../../../../../directives/number/number.module';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditClubsComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.CLUBS }
  }
];

@NgModule({
  declarations: [AddEditClubsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    SelectSearchModule,
    GoogleMapModule,
    NumberModule
  ]
})
export class AddEditClubsModule { }
