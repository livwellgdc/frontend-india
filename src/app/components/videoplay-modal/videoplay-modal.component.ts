import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'lv-videoplay-modal',
  templateUrl: './videoplay-modal.component.html',
  styleUrls: ['./videoplay-modal.component.scss']
})
export class VideoplayModalComponent {

  constructor(
    private dialogRef: MatDialogRef<VideoplayModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.dialogRef._containerInstance._config.width = '400px';
    this.dialogRef._containerInstance._config.autoFocus = false;
  }

  ngOnInit() {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
