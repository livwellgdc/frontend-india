import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditSpinWheelsRoutingModule } from './add-edit-spin-wheels-routing.module';
import { AddEditSpinWheelsComponent } from './add-edit-spin-wheels.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [AddEditSpinWheelsComponent],
  imports: [
    CommonModule,
    AddEditSpinWheelsRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule
  ]
})
export class AddEditSpinWheelsModule { }
