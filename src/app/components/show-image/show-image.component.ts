import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'lv-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<ShowImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }


  ngOnInit() {
  }

}
