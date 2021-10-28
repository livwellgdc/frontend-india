import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { removePrefixFromArrayValues } from '../../constants/helper';

@Component({
  selector: 'lv-seats-arrangement',
  templateUrl: './seats-arrangement.component.html',
  styleUrls: ['./seats-arrangement.component.scss']
})
export class SeatsArrangementComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<SeatsArrangementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  removeSeat(seatIndex: number) {
    this.data.seatArray.splice(seatIndex, 1);
  }

  closePopup() {
    this._dialogRef.close(removePrefixFromArrayValues(this.data.seatArray));
  }

}
