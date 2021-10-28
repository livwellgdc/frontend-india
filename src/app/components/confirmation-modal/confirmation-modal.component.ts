import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from '../toast-notification/toast.service';

@Component({
  selector: 'lv-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  public filterForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private  toast: ToastService,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.dialogRef._containerInstance._config.width = '400px';
    this.dialogRef._containerInstance._config.autoFocus = false;
    if(this.data.listType == "REJECT") {
      this.filterForm = this._fb.group({
        notes: [''],
        others: ['']
      })
    }
    console.log(this.data)
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }
  get f() { return this.filterForm.controls } // return form controls

  confirm() {
    if (this.data.listType == "REJECT") {
      if(this.filterForm.invalid) {
        this.toast.error("Plese Select Note")
      } else {
        if(this.filterForm.value.notes == 'Others') {
          this.filterForm.value.notes = this.filterForm.value.others;
        }
        this.dialogRef.close(this.filterForm.value.notes);
      }
    } else {
      this.dialogRef.close(true);
    }
  }

}
