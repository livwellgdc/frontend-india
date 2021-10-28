import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { VideoplayModalComponent } from './videoplay-modal.component';
import { SafeModule } from 'src/app/pipes/safe/safe.module';

@NgModule({
  declarations: [VideoplayModalComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    SafeModule
  ],
  entryComponents: [VideoplayModalComponent],
})
export class VideoplayModalModule { }
