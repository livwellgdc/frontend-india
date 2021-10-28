import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { URBOX_POPUP_MESSAGES, URBOX_STATUS } from 'src/app/constants/messages';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ToastService } from '../toast-notification/toast.service';
import { UrboxService } from './urbox.service';

@Component({
  selector: 'lv-urbox-toggle-button',
  templateUrl: './urbox-toggle-button.component.html',
  styleUrls: ['./urbox-toggle-button.component.scss'],
  providers:[UrboxService]
})
export class UrboxToggleButtonComponent implements OnInit {

  public urbox_status = new FormControl();
  public urbox_status_list = URBOX_STATUS;
  constructor(
    private _urbox: UrboxService, 
    private _dialog: MatDialog,
    private _toast: ToastService) { }

  ngOnInit() {
    this.getUrBoxStatus();
  }

  private getUrBoxStatus(): void {
    this._urbox.getUrBoxStatus().subscribe(response => {
      console.log(response)
      this.urbox_status.setValue(response.data.status == URBOX_STATUS.ACTIVE ? true : false);
    })
  }

  public onChange() {
    console.log(this.urbox_status.value);

    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      minWidth: '400px',
      data: { title: `${ URBOX_POPUP_MESSAGES.TITLE } ${ this.urbox_status.value ? 'ENABLE' : 'DISABLE' }  Confirmation`, message: `${ URBOX_POPUP_MESSAGES.MESSAGE } ${this.urbox_status.value ? 'enable' : 'disable'} URBOX` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let body = {
          status: this.urbox_status.value ? URBOX_STATUS.ACTIVE : URBOX_STATUS.INACTIVE,
        }
        this._urbox.updateUrboxStatus(body).subscribe((res) => {
          if (res.statusCode === 200) {
            this._toast.success(res.message)
          }
        });
      } else {
        this.urbox_status.setValue(!this.urbox_status.value);
      }
    });
    
  } 

}
