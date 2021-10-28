import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendmailComponent } from './sendmail.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [SendmailComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [SendmailComponent]
})
export class SendmailModule { }
