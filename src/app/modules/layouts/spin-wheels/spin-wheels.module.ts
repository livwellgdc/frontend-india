import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinWheelsRoutingModule } from './spin-wheels-routing.module';
import { SpinWheelsComponent } from './spin-wheels.component';

@NgModule({
  declarations: [SpinWheelsComponent],
  imports: [
    CommonModule,
    SpinWheelsRoutingModule
  ]
})
export class SpinWheelsModule { }
