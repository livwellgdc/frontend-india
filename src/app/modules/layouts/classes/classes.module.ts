import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: ClassesComponent, children: [
      { path: '', loadChildren: () => import('./pages/classes-listing/classes-listing.module').then(m => m.ClassesListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-classes/add-edit-classes.module').then(m => m.AddEditClassesModule) },
      { path: `${EDIT}/:classId`, loadChildren: () => import('./pages/add-edit-classes/add-edit-classes.module').then(m => m.AddEditClassesModule) },
      { path: ':classId', loadChildren: () => import('./pages/classes-details/classes-details.module').then(m => m.ClassesDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [ClassesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class ClassesModule { }
