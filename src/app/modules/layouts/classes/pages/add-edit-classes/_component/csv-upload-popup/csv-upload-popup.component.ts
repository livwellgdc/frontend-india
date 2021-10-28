import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DATE_TYPES } from '../../../../../../../constants/messages';

@Component({
  selector: 'lv-csv-upload-popup',
  templateUrl: './csv-upload-popup.component.html',
  styleUrls: ['./csv-upload-popup.component.scss']
})
export class CsvUploadPopupComponent implements OnInit {
  csvStatus: any;
  dateType = DATE_TYPES;

  constructor(
    private _dialogRef: MatDialogRef<CsvUploadPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    this.csvStatus = this.data.data;
  }

}
