import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { POINTS_DISTRIBUTION_FREQUENCY, CLIENT_CLUB_ERROR_MESSAGES, INVALID_DATE_TIME_ERROR } from '../../../../../constants/messages';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ClientClubService } from '../../_service/client-club.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BC_CLIENT_CLUBS_EDIT, BC_CLIENT_CLUBS_ADD } from '../../../../../constants/breadcrumb-routes';
import { Location } from '@angular/common';
import { CLIENT_CLUBS } from '../../../../../constants/routes';
import { MatCheckboxChange } from '@angular/material';
import { dateToMs, toUpperCase } from '../../../../../constants/helper';

@Component({
  selector: 'lv-add-edit-client-clubs',
  templateUrl: './add-edit-client-clubs.component.html',
  styleUrls: ['./add-edit-client-clubs.component.scss'],
  providers: [ClientClubService]
})
export class AddEditClientClubsComponent extends Pagination implements OnInit {

  clientClubForm: FormGroup;
  _limit = LIMIT;
  errMsg = { ...CLIENT_CLUB_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  frequency = POINTS_DISTRIBUTION_FREQUENCY;
  clientId: string;
  clientClubDetails: ClientClub.ClientClubData;

  @ViewChild('purchasePoints', { static: true }) purchasePoints: ElementRef;
  @ViewChild('allMembersPoints', { static: true }) allMembersPoints: ElementRef;
  @ViewChild('membersPoints', { static: true }) membersPoints: ElementRef;
  @ViewChild('nonMembersPoints', { static: true }) nonMembersPoints: ElementRef;
  @ViewChild('centurionMembersPoints', { static: true }) centurionMembersPoints: ElementRef;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _toast: ToastService,
    public _common: CommonService,
    private _clientClub: ClientClubService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute
  ) { super() }

  ngOnInit() {
    this.clientId = this._actRoute.snapshot.params['clientId'];
    this.createForm();
    if (this.clientId) {
      this._bc.setBreadcrumb(BC_CLIENT_CLUBS_EDIT);
      if (this._common.isValidId(this.clientId)) {
        this.getClientClubDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_CLIENT_CLUBS_ADD);
    }
  }

  createForm() {
    this.clientClubForm = this._fb.group({
      name: [''],
      points: [, [Validators.pattern(REGEX.AMOUNT)]],
      frequencyType: [''],
      startDate: [],
      endDate: [],
      joinedDate: [],
      allMembers: this._fb.group({
        value: [true],
        points: [0]
      }),
      members: this._fb.group({
        value: [this.errMsg.MEMBERS],
        points: [0]
      }),
      nonMembers: this._fb.group({
        value: [this.errMsg.NON_MEMBERS],
        points: [0]
      }),
      centurionMembers: this._fb.group({
        value: [this.errMsg.CENTURION_MEMBERS],
        points: [0]
      }),
      iconicMembers: this._fb.group({
        value: [this.errMsg.ICONIC_MEMBERS],
        points: [0]
      }),
    })
  }

  get f() { return this.clientClubForm.controls }; //return form controls

  getClientClubDetails() {
    this._clientClub.getClientClubDetail({ clientId: this.clientId }).subscribe((res: ClientClub.ClientClubDetail) => {
      if (res.statusCode == 200) {
        this.clientClubDetails = res.data;
        this.clientClubForm.patchValue(this.clientClubDetails);
        this.f.startDate.setValue(new Date(this.clientClubDetails.startDate));
        this.f.endDate.setValue(new Date(this.clientClubDetails.endDate));
        if (this.clientClubDetails.joinedDate) {
          this.f.joinedDate.setValue(new Date(this.clientClubDetails.joinedDate));
        }
        this.setToAll(this.clientClubDetails.members.points);
      }
    })
  }

  removeJoinedDate() {
    this.f.joinedDate.setValue('');
  }

  onChangeCheckbox(event: MatCheckboxChange) {
    if (event.checked) {
      let inputValue = this.f['allMembers']['controls'].points.value;
      this.setEquallyPoints(inputValue);
    } else {
      this.setEquallyPoints(0, true);
    }
  }

  onEnterPointsForAllMembers(event: any) {
    let inputValue = event.target.value;
    if (this.f['allMembers']['controls'].value.value) {
      this.setEquallyPoints(inputValue, true);
    }
  }

  setEquallyPoints(pointsValue: number, isInAllMembers: boolean = false) {
    if (isInAllMembers) {
      this.f['allMembers']['controls'].points.setValue(pointsValue);
    }
    this.f['iconicMembers']['controls'].points.setValue(pointsValue);
    this.f['members']['controls'].points.setValue(pointsValue);
    this.f['nonMembers']['controls'].points.setValue(pointsValue);
    this.f['centurionMembers']['controls'].points.setValue(pointsValue);
  }

  onEnterPointsForDifferentMembers(event: any) {
    let inputValue = event.target.value;
    this.setToAll(inputValue);
  }

  setToAll(inputValue) {
    let iconicMemberPointValue = this.f['iconicMembers']['controls'].points.value;
    let memberPointValue = this.f['members']['controls'].points.value;
    let nonMemberPointValue = this.f['nonMembers']['controls'].points.value;
    let centurionMemberPointValue = this.f['centurionMembers']['controls'].points.value;
    if (
      Number(memberPointValue) == Number(nonMemberPointValue) &&
      Number(memberPointValue) == Number(centurionMemberPointValue) &&
      Number(memberPointValue) == Number(iconicMemberPointValue)
    ) {
      this.f['allMembers']['controls'].value.setValue(true);
      this.f['allMembers']['controls'].points.setValue(inputValue);
    } else {
      this.f['allMembers']['controls'].value.setValue(false);
      this.f['allMembers']['controls'].points.setValue(0);
    }
  }

  startDateChange() {
    this.f.endDate.setValue(null);
  }

  clientClubHandler() {
    this.checkValidation();

    if (this.clientClubForm.valid) {
      this.objectFormation();
    }
  }

  objectFormation() {
    let formValue = this.clientClubForm.value;
    formValue.name = toUpperCase(formValue.name);
    formValue.startDate = dateToMs(formValue.startDate);
    formValue.endDate = dateToMs(formValue.endDate, true);
    if (formValue.joinedDate) {
      formValue.joinedDate = +new Date(formValue.joinedDate).setHours(0, 0, 1);
    } else {
      delete formValue.joinedDate;
    }
    formValue.points = Number(formValue.points);
    formValue.allMembers.points = Number(formValue.allMembers.points);
    formValue.members.points = Number(formValue.members.points);
    formValue.nonMembers.points = Number(formValue.nonMembers.points);
    formValue.iconicMembers.points = Number(formValue.iconicMembers.points);
    formValue.centurionMembers.points = Number(formValue.centurionMembers.points);

    if (formValue.allMembers.value && Number(formValue.allMembers.points) > formValue.points) {
      this.allMembersPoints.nativeElement.focus();
      this._toast.error(this.errMsg.ALL_MEMBERS_POINT);
      return
    }

    if (formValue.members.points > formValue.points) {
      this.membersPoints.nativeElement.focus();
      this._toast.error(this.errMsg.MEMBERS_POINT);
      return
    }

    if (formValue.nonMembers.points > formValue.points) {
      this.nonMembersPoints.nativeElement.focus();
      this._toast.error(this.errMsg.NON_MEMBERS_POINT);
      return
    }

    if (formValue.centurionMembers.points > formValue.points) {
      this.centurionMembersPoints.nativeElement.focus();
      this._toast.error(this.errMsg.CENTURION_MEMBERS_POINT);
      return
    }

    if ((formValue.members.points + formValue.nonMembers.points + formValue.centurionMembers.points + formValue.iconicMembers.points) > formValue.points) {
      this.purchasePoints.nativeElement.focus();
      this._toast.error(this.errMsg.PURCHASE_POINT);
      return
    }
    this.confirmActionHandler(formValue);
  }

  confirmActionHandler(formValue) {
    if (this.clientId) {
      if (this.clientClubForm.dirty) {
        this.updateClientClub(formValue);
      } else {
        this.navigate();
      }
    } else {
      this.addNewClientClub(formValue);
    }
  }

  addNewClientClub(formValue: any) {
    this._clientClub.addClientClub(formValue).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateClientClub(formValue: any) {
    formValue['clientId'] = this.clientId;
    this._clientClub.updateClientClub(formValue).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }


  checkValidation() {

    for (const key in this.clientClubForm.value) {
      if (this.clientClubForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.f.startDate.value) {
      this.f.startDate.setErrors({ required: true });
    }

    if (!this.f.endDate.value) {
      this.f.endDate.setErrors({ required: true });
    }

    if (!this.f.startDate.valid) {
      this.f.startDate.setErrors({ 'invalid': true });
      return
    }

  }

  cancelHandler() {
    this._loc.back();
  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([CLIENT_CLUBS]);
  }

}
