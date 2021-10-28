import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { NumberModule } from '../../../../../directives/number/number.module';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { AddEditDeeplinksComponent } from './add-edit-deeplinks.component';
import { PreventAddEditGuard } from 'src/app/services/guards/prevent-add-edit/prevent-add-edit.guard';

const inrRoute: Routes = [
  {
    path: '', component: AddEditDeeplinksComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.DEEP_LINKS }
  }
]

@NgModule({
  declarations: [AddEditDeeplinksComponent],
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
    NumberModule
  ]
})
export class AddEditDeeplinksModule { }
