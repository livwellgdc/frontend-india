import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'lv-show-coupon-codes',
  templateUrl: './show-coupon-codes.component.html',
  styleUrls: ['./show-coupon-codes.component.scss']
})
export class ShowCouponCodesComponent implements OnInit {

  public title: string = "Coupon Codes";
  constructor(
    private _dialogRef: MatDialogRef<ShowCouponCodesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    if(this.data.title) {
      this.title = this.data.title; 
    } else {
      this.title = "Coupon Codes";
    }
  }

}
