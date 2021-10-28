import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StorageService } from '../../../../services/storage/storage.service';
import { ConfirmationModalComponent } from '../../../../components/confirmation-modal/confirmation-modal.component';
import { LOGOUT_POPUP_MESSAGES } from '../../../../constants/messages';
import { AccountService } from '../../../accounts/_service/account.service';
import { ToastService } from '../../../../components/toast-notification/toast.service';

@Component({
  selector: 'lv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AccountService]
})
export class HeaderComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    public _storage: StorageService,
    private _toast: ToastService,
    private _account: AccountService) {
  }

  ngOnInit() {
  }

  logoutHandler() {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      minWidth: '400px',
      data: { title: LOGOUT_POPUP_MESSAGES.TITLE, message: LOGOUT_POPUP_MESSAGES.MESSAGE }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._account.logOut({}).subscribe((res) => {
          if (res.statusCode === 200) {
            this._storage.logOut();
            this._toast.success(res.message)
          }
        });
      }
    });
  }

}
