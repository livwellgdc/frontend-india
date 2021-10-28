import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SECTION_ID_OF } from 'src/app/constants/messages';
import { PreventAddEditGuard } from 'src/app/services/guards/prevent-add-edit/prevent-add-edit.guard';
import { AddEditSpinWheelsComponent } from './add-edit-spin-wheels.component';

const inrRoute: Routes = [
  {
    path: '', component: AddEditSpinWheelsComponent,
    canActivate: [PreventAddEditGuard],
    data: { roles: SECTION_ID_OF.SPIN_WHEEL }
  }
]

@NgModule({
  imports: [RouterModule.forChild(inrRoute)],
  exports: [RouterModule]
})
export class AddEditSpinWheelsRoutingModule { }
