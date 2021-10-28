import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatButtonModule, MatButtonToggleModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const inrRoutes: Routes = [
  { path: '', component: DashboardComponent },
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonToggleModule
  ]
})
export class DashboardModule { }
