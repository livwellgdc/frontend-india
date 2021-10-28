import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditSubscriptionFeaturesComponent } from './add-edit-subscription-features.component';
import { SECTION_ID_OF } from 'src/app/constants/messages';
import { RouterModule, Routes } from '@angular/router';
import { PreventAddEditGuard } from 'src/app/services/guards/prevent-add-edit/prevent-add-edit.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NumberModule } from 'src/app/directives/number/number.module';

const inrRoute: Routes = [
  {
    path: '', component: AddEditSubscriptionFeaturesComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.SUBSCRIPTION_FEATURES }
  }
]

@NgModule({
  declarations: [AddEditSubscriptionFeaturesComponent],
  imports: [
    CommonModule,
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
export class AddEditSubscriptionFeaturesModule { }
