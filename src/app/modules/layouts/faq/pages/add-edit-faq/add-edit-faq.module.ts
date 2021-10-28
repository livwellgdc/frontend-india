import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditFaqComponent } from './add-edit-faq.component';
import { Routes, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { SafeModule } from '../../../../../pipes/safe/safe.module';
import { NumberModule } from '../../../../../directives/number/number.module';
import { PreventAddEditGuard } from '../../../../../services/guards/prevent-add-edit/prevent-add-edit.guard';
import { SECTION_ID_OF } from '../../../../../constants/messages';

const inrRoutes: Routes = [
  {
    path: '', component: AddEditFaqComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.FAQ }
  }
];

@NgModule({
  declarations: [AddEditFaqComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    QuillModule.forRoot(),
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    SafeModule,
    NumberModule
  ]
})
export class AddEditFaqModule { }
