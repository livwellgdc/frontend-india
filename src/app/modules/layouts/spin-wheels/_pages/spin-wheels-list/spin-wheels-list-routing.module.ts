import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpinWheelsListComponent } from './spin-wheels-list.component';

const innerRoutes: Routes = [
  { path: '', component: SpinWheelsListComponent }
]

@NgModule({
  imports: [RouterModule.forChild(innerRoutes)],
  exports: [RouterModule]
})
export class SpinWheelsListRoutingModule { }
