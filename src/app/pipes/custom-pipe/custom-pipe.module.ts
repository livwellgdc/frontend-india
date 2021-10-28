import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPipe } from './custom-pipe.pipe';

@NgModule({
  declarations: [CustomPipe],
  imports: [
    CommonModule
  ],
  exports: [CustomPipe]
})
export class CustomPipeModule { }
