import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientClubsComponent } from './client-clubs.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: ClientClubsComponent, children: [
      { path: '', loadChildren: () => import('./pages/client-clubs-listing/client-clubs-listing.module').then(m => m.ClientClubsListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-client-clubs/add-edit-client-clubs.module').then(m => m.AddEditClientClubsModule) },
      { path: `${EDIT}/:clientId`, loadChildren: () => import('./pages/add-edit-client-clubs/add-edit-client-clubs.module').then(m => m.AddEditClientClubsModule) },
      { path: ':clientId', loadChildren: () => import('./pages/client-clubs-details/client-clubs-details.module').then(m => m.ClientClubsDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [ClientClubsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class ClientClubsModule { }
