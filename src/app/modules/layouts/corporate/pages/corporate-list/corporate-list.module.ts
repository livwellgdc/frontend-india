import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateListComponent } from './corporate-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { ReactiveFormsModule } from '@angular/forms';

const inrRoutes: Routes = [
  {
    path: '', component: CorporateListComponent
  }
];

@NgModule({
  declarations: [CorporateListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule,
    ReactiveFormsModule
  ]
})
export class CorporateListModule { }
