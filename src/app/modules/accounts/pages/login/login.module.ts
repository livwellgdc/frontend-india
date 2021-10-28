import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule, MatIconModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AbsoluteRoutingModule } from '../../../../pipes/absolute-routing/absolute-routing.module';
import { PreventKeysModule } from '../../../../directives/prevent-keys/prevent-keys.module';
import { SendCodeModule } from 'src/app/components/send-code/send-code.module';

const inrRoute: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoute),
    AbsoluteRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    PreventKeysModule,
    SendCodeModule,
    MatSelectModule
  ]
})
export class LoginModule { }
