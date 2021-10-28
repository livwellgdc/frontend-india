import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelesTrackerService } from 'src/app/modules/layouts/seles-tracker/_services/seles-tracker.service';
import { ShowCouponCodesComponent } from '../show-coupon-codes/show-coupon-codes.component';

@Component({
  selector: 'lv-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.scss'],
  providers: [SelesTrackerService]
})
export class SendmailComponent implements OnInit {

  @Output() sendMail: EventEmitter<any> = new EventEmitter();
  public mailList: string[] =[];
  constructor( private _dialog: MatDialog,
    private _seles_tracker: SelesTrackerService) { }

  ngOnInit() {
    this.getSalesReportMailList();
  }

  public getSalesReportMailList(): void {
    this._seles_tracker.getSalesTrackMailList().subscribe(response => {
      if(response.statusCode == 200) {
        this.mailList = response.data.emails.map(eachmail => eachmail.mail);
      }
    }, () => {
      this.mailList = [];
    });
  }

  sendReports() {
    this.sendMail.emit();
  }

  showCouponCode() {
      this.openCodeDialog(this.mailList);
  }

  openCodeDialog(arrayOfCode) {
    if (arrayOfCode.length > 0) {
      this._dialog.open(ShowCouponCodesComponent, {
        data: {
          couponCodeArray: arrayOfCode,
          title: "Sales Report Email Ids"
        }
      });
    }
  }


}
