import { MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot.component';
import { Routes, RouterModule } from '@angular/router';
import { AbsoluteRoutingModule } from '../../../../pipes/absolute-routing/absolute-routing.module';
import { PreventKeysModule } from '../../../../directives/prevent-keys/prevent-keys.module';
import { SuccessPopupModule } from '../../../../components/success-popup/success-popup.module';

const inrRoute: Routes = [
  { path: '', component: ForgotComponent }
];

@NgModule({
  declarations: [ForgotComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoute),
    AbsoluteRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    PreventKeysModule,
    SuccessPopupModule
  ]
})
export class ForgotModule { }
