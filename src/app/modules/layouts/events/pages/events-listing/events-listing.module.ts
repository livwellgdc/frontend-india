import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListingComponent } from './events-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';

const inrRoutes: Routes = [
  {
    path: '', component: EventsListingComponent
  }
];

@NgModule({
  declarations: [EventsListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatTableRendererModule,
    MatCheckboxModule
  ]
})
export class EventsListingModule { }
