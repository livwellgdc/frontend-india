import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinksListComponent } from './quicklinks-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { ReactiveFormsModule } from '@angular/forms';

const innerRoutes: Routes = [
  { path: '', component: QuicklinksListComponent }
]

@NgModule({
  declarations: [QuicklinksListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    MatTableRendererModule,
    ReactiveFormsModule
  ]
})
export class QuicklinksListModule { }
