import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionFeaturesListComponent } from './subscription-features-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { ReactiveFormsModule } from '@angular/forms';

const innerRoutes: Routes = [
  { path: '', component: SubscriptionFeaturesListComponent }
]

@NgModule({
  declarations: [SubscriptionFeaturesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    MatTableRendererModule,
    ReactiveFormsModule
  ]
})
export class SubscriptionFeaturesListModule { }
