import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MANAGE_TYPE_OF } from '../../../../../../../constants/messages';

@Component({
  selector: 'lv-show-permissions',
  templateUrl: './show-permissions.component.html',
  styleUrls: ['./show-permissions.component.scss']
})
export class ShowPermissionsComponent implements OnInit {

  manageTypeValue = MANAGE_TYPE_OF;

  constructor(
    private _dialogRef: MatDialogRef<ShowPermissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
