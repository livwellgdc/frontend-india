import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: EventsComponent, children: [
      { path: '', loadChildren: () => import('./pages/events-listing/events-listing.module').then(m => m.EventsListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-events/add-edit-events.module').then(m => m.AddEditEventsModule) },
      { path: `${EDIT}/:eventId`, loadChildren: () => import('./pages/add-edit-events/add-edit-events.module').then(m => m.AddEditEventsModule) },
      { path: ':eventId', loadChildren: () => import('./pages/events-details/events-details.module').then(m => m.EventsDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
   
  ]
})
export class EventsModule { }
