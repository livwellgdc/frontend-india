import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatsArrangementComponent } from './seats-arrangement.component';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { ResultNotFoundModule } from '../result-not-found/result-not-found.module';

@NgModule({
  declarations: [SeatsArrangementComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ResultNotFoundModule,
    MatIconModule
  ],
  entryComponents: [SeatsArrangementComponent]
})
export class SeatsArrangementModule { }
