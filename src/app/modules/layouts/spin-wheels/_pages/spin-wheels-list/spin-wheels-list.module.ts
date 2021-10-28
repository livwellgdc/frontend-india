import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinWheelsListRoutingModule } from './spin-wheels-list-routing.module';
import { SpinWheelsListComponent } from './spin-wheels-list.component';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';

@NgModule({
  declarations: [SpinWheelsListComponent],
  imports: [
    CommonModule,
    SpinWheelsListRoutingModule,
    MatTableRendererModule
  ]
})
export class SpinWheelsListModule { }
