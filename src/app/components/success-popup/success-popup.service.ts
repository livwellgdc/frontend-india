import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SuccessPopupComponent } from './success-popup.component';

@Injectable()
export class SuccessPopupService {

  constructor(
    private dialog: MatDialog,
    private route: Router) { }

  successBox(title?: string, message?: string, redirect?: any, btn1?: string) {
    const _dialog = this.dialog.open(SuccessPopupComponent, {
      disableClose: true,
      data: {
        title: title,
        message: message,
        btn1: btn1
      }
    });
    _dialog.afterClosed().subscribe(result => {
      this.route.navigateByUrl(redirect);
    });
  }
}
