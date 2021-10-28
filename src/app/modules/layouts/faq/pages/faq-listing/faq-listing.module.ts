import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqListingComponent } from './faq-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: FaqListingComponent
  }
];

@NgModule({
  declarations: [FaqListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule
  ]
})
export class FaqListingModule { }
