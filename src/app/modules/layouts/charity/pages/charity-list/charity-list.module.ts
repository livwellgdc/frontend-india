import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CharityListComponent } from './charity-list.component';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { ReactiveFormsModule } from '@angular/forms';

const innerRoutes: Routes = [
  { path: '', component: CharityListComponent }
]

@NgModule({
  declarations: [CharityListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    MatTableRendererModule,
    ReactiveFormsModule
  ]
})
export class CharityListModule { }
