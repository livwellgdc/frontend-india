import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditClientClubsComponent } from './add-edit-client-clubs.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule, MatRadioModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { NumberModule } from '../../../../../directives/number/number.module';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditClientClubsComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.CLIENTS }
  }
];

@NgModule({
  declarations: [AddEditClientClubsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    NumberModule,
    MatIconModule
  ]
})
export class AddEditClientClubsModule { }
