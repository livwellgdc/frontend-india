import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyVideoComponent } from './lazy-video.component';
import { MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { SafeModule } from 'src/app/pipes/safe/safe.module';

@NgModule({
  declarations: [LazyVideoComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SafeModule
  ],
  exports: [LazyVideoComponent]
})
export class LazyVideoModule { }
