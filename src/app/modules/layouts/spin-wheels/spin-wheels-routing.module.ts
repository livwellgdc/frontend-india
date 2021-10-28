import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from 'src/app/constants/routes';
import { SpinWheelsComponent } from './spin-wheels.component';


const innerRoutes: Routes = [
  { 
    path:"", component: SpinWheelsComponent, children : [
    { path: "", loadChildren: () => import("./_pages/spin-wheels-list/spin-wheels-list.module").then(m => m.SpinWheelsListModule) },
      { path: ADD, loadChildren: () => import("./_pages/add-edit-spin-wheels/add-edit-spin-wheels.module").then(m => m.AddEditSpinWheelsModule)},
      { path: `${EDIT}/:spinnerWheelMetaId`, loadChildren: () => import("./_pages/add-edit-spin-wheels/add-edit-spin-wheels.module").then(m => m.AddEditSpinWheelsModule)},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(innerRoutes)],
  exports: [RouterModule]
})
export class SpinWheelsRoutingModule { }
