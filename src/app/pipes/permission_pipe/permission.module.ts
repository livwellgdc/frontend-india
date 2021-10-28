import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionPipe } from './permission.pipe';

@NgModule({
  declarations: [PermissionPipe],
  imports: [
    CommonModule
  ],
  exports: [PermissionPipe]
})
export class PermissionModule { }
