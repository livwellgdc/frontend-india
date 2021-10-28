import { Component, OnInit } from '@angular/core';
import { PromoService } from '../../_service/promo.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_PROMO_MGMT } from '../../../../../constants/breadcrumb-routes';
import { PROMO_CODE_ERROR_MESSAGES } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { getRandomStringsArray } from '../../../../../constants/helper';

@Component({
  selector: 'lv-promo-mgmt',
  templateUrl: './promo-mgmt.component.html',
  styleUrls: ['./promo-mgmt.component.scss'],
  providers: [PromoService]
})
export class PromoMgmtComponent extends Pagination implements OnInit {
  promoCodeForm: FormGroup;
  arrayInfoVariables = {
    rewardList: [],
    userList: [],
    localUserArray: [],
    selectedUserIds: []
  }
  errMsg = PROMO_CODE_ERROR_MESSAGES;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _promo: PromoService,
    private _snackBar: MatSnackBar,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_PROMO_MGMT);
    this.limit = 100;
    this.createForm();
    this.getPromoRewards();
    this.getAllUsers();
  }

  createForm() {
    this.promoCodeForm = this._fb.group({
      rewardId: [''],
      userIds: [[]]
    })
  }

  get f() { return this.promoCodeForm.controls } //return all form controls

  submitHandler() {
    if (this.f.rewardId.value && this.f.userIds.value.length > 0) {
      let formValue = this.promoCodeForm.value;
      let couponAvailabilityCount = this.findcouponAvailabilityCount(formValue.rewardId);
      if (formValue.userIds.length > couponAvailabilityCount) {
        this._toast.warning(this.errMsg.PROMO_ERROR);
        return
      }
      if (formValue.userIds.length > this.errMsg.MAX_USER_COUNT) {
        this._toast.warning(this.errMsg.PROMO_NOTE(this.errMsg.MAX_USER_COUNT));
        return
      }
      this.assignPromoCodes(formValue);
    } else {
      if (!this.f.rewardId.value) {
        this.f.rewardId.setErrors({ required: true });
      }
      if (!this.f.userIds.value.length) {
        this.f.userIds.setErrors({ required: true });
      }
    }
  }

  findcouponAvailabilityCount(rewardId: string) {
    for (let find = 0; find < this.arrayInfoVariables.rewardList.length; find++) {
      if (rewardId == this.arrayInfoVariables.rewardList[find]._id) {
        return this.arrayInfoVariables.rewardList[find].totalAvailableCoupons;
      }
    }
  }

  assignPromoCodes(formBody) {
    this._promo.distributePromoCodes(formBody).subscribe(res => {
      this._toast.success(res.message);
      this.decreaseAvailabilityCount(formBody);
      this.f.userIds.setValue([]);
      this.f.rewardId.setValue('');
    })
  }

  decreaseAvailabilityCount(formInfo) {
    for (let find = 0; find < this.arrayInfoVariables.rewardList.length; find++) {
      if (formInfo.rewardId == this.arrayInfoVariables.rewardList[find]._id) {
        this.arrayInfoVariables.rewardList[find].totalAvailableCoupons = this.arrayInfoVariables.rewardList[find].totalAvailableCoupons - formInfo.userIds.length;
        if (this.arrayInfoVariables.rewardList[find].totalAvailableCoupons == 0) {
          this.arrayInfoVariables.rewardList.splice(find, 1);
        }
        break;
      }
    }
  }

  getPromoRewards() {
    this._promo.getRewrdsForPromoCodes({ pageNo: 1, limit: 100 }).subscribe(response => {
      if (response && response.data) {
        this.arrayInfoVariables.rewardList = response.data;
      }
    }, (error) => {
      this.arrayInfoVariables.rewardList = [];
    })
  }

  loadMoreUsers(event: any) {
    switch (event.type) {
      case 'LOAD_MORE':
        if (event.body) {
          this.resetPages();
          if (event.body === 'RESET_VALUES') {
            this.getAllUsers(null);
          } else {
            this.getAllUsers(event.body);
          }
        } else {
          if (this.nextHit <= 0) { return }
          ++this.pageNo;
          this.getAllUsers();
        }
        break;

      case 'SELECT_CHANGE':
        const data = event.body;
        if (data.isChecked) {
          this.arrayInfoVariables.localUserArray.push(data);
          this.arrayInfoVariables.selectedUserIds.push(data._id);
          this.arrayInfoVariables.userList.forEach((el, i) => {
            if (el._id == data._id) {
              this.arrayInfoVariables.userList.splice(i, 1)
            }
          })
          this.arrayInfoVariables.userList.unshift(data);
        } else {
          const removeIndex = this.arrayInfoVariables.selectedUserIds.indexOf(data._id);
          if (removeIndex != -1) {
            this.arrayInfoVariables.selectedUserIds.splice(removeIndex, 1);
            this.arrayInfoVariables.localUserArray.splice(removeIndex, 1)
          }
        }
        break;

      default:
        throw `UNKNOWN`;
    }
  }

  getAllUsers(searchText?) {
    let queryParams = {
      ...this.pageParams
    }
    if (searchText) {
      queryParams['searchKey'] = searchText;
    }
    this._promo.getUsersForPromoCodes(queryParams).subscribe(response => {
      if (response && response.total === 0) {
        this.showMessage();
      }
      this.f.userIds.setValue(this.arrayInfoVariables.selectedUserIds);

      if (this.pageNo == 1) {
        this.arrayInfoVariables.userList = response.data;
      } else {
        response.data.forEach(data => {
          this.arrayInfoVariables.userList.push(data);
          this.arrayInfoVariables.selectedUserIds.forEach(selectedId => {
            for (let find = 0; find < this.arrayInfoVariables.userList.length; find++) {
              if (selectedId === this.arrayInfoVariables.userList[find]._id) {
                this.arrayInfoVariables.userList[find]['isChecked'] = true;
                this.arrayInfoVariables.userList.splice(find, 1)
                break;
              }
            }
          });
        });
      }

      this.arrayInfoVariables.selectedUserIds.forEach(selectedId => {
        for (let find = 0; find < this.arrayInfoVariables.userList.length; find++) {
          if (selectedId === this.arrayInfoVariables.userList[find]._id) {
            this.arrayInfoVariables.userList[find]['isChecked'] = true;
            this.arrayInfoVariables.userList.splice(find, 1)
            break;
          }
        }
      });

      if (this.arrayInfoVariables.localUserArray.length > 0) {
        this.arrayInfoVariables.localUserArray.forEach(element => {
          this.arrayInfoVariables.userList.unshift(element);
        });
      }

      this.nextHit = response.nextHit;
    }, (error) => {
      this.arrayInfoVariables.userList = [];
    })
  }

  showMessage() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 3000;
    config.panelClass = ['snack-bar-color'];
    this._snackBar.open('User Not Found!', 'OK', config)
  }

}
