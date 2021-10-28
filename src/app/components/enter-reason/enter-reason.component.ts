import { Component, OnInit, Inject } from '@angular/core';
import { REASON_MESSAGE } from '../../constants/messages';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from '../toast-notification/toast.service';

@Component({
  selector: 'lv-enter-reason',
  templateUrl: './enter-reason.component.html',
  styleUrls: ['./enter-reason.component.scss']
})
export class EnterReasonComponent implements OnInit {
  text: string = "";
  _reason = REASON_MESSAGE;
  constructor(private _dialogRef: MatDialogRef<EnterReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _toast: ToastService) { }

  ngOnInit() { }

  onSubmit() {
    this.text = this.text.trim();
    if (this.text.length <= 0 || this.text.length > this._reason.REASON_LIMIT) {
      this._toast.error(this.text.length == 0 ? this._reason.REASON_EMPTY(this.data.placeholder) : this._reason.REASON_MAX_LIMIT_MESSAGE);
      return;
    }
    const reason = {
      reason: this.text
    };
    this._dialogRef.close(reason);
  }
}
