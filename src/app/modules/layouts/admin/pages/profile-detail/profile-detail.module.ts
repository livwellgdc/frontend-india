
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail.component';
import { MatButtonModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';

const inrRoutes: Routes = [
  { path: '', component: ProfileDetailComponent }
];


@NgModule({
  declarations: [ProfileDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    AbsoluteRoutingModule,
    MatButtonModule,
    EmptyValueModule
  ]
})
export class ProfileDetailModule { }
