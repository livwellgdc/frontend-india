import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LIMIT } from '../../../../../constants/validator';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { BC_BOARDS_EDIT, BC_BOARDS_ADD } from '../../../../../constants/breadcrumb-routes';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { BOARDS } from '../../../../../constants/routes';
import { BoardService } from '../../_service/board.service';
import { BOARD_ERROR_MESSAGES } from '../../../../../constants/messages';

@Component({
  selector: 'lv-add-edit-boards',
  templateUrl: './add-edit-boards.component.html',
  styleUrls: ['./add-edit-boards.component.scss'],
  providers: [S3BucketService, BoardService]
})
export class AddEditBoardsComponent implements OnInit {
  boardForm: FormGroup;
  boardId: string;
  boardDetails: Board.BoardData;
  cropFile: any;
  _limit = LIMIT;
  errMsg = BOARD_ERROR_MESSAGES;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _common: CommonService,
    private _toast: ToastService,
    private _board: BoardService,
    private _s3: S3BucketService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _loc: Location,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.boardId = this._actRoute.snapshot.params['boardId'];
    this.createForm();
    if (this.boardId) {
      this._bc.setBreadcrumb(BC_BOARDS_EDIT);
      if (this._common.isValidId(this.boardId)) {
        this.getBoardDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_BOARDS_ADD);
    }
  }

  createForm() {
    this.boardForm = this._fb.group({
      image: [''],
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      description: this._fb.group({
        en: [''],
        vi: ['']
      })
    })
  }

  get f() { return this.boardForm.controls } //return form controls

  getBoardDetails() {
    this._board.getBoardDetail({ boardId: this.boardId }).subscribe((res: Board.BoardDetail) => {
      if (res.statusCode == 200) {
        this.boardDetails = res.data;
        this.cropFile = {
          cropBase64: this.boardDetails.image,
          cropFile: this.boardDetails.image
        }
        this.boardForm.patchValue(this.boardDetails);
      }
    })
  }

  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 10 / 7.5, inputWidth: 400, type: 'CHALLENGE' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.image.setErrors(null);
        this.f.image.markAsDirty();
      }
    });
  }

  async boardHandler() {
    this.checkValidation();
    if (this.boardForm.valid) {
      let formValue = this.boardForm.value;

      if (this.cropFile && this.f.image.dirty) {
        await this.uploadImage(formValue);
      }

      if (this.boardId) {
        if (this.boardForm.dirty) {
          this.updateBoard(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewBoard(formValue);
      }
    }
  }

  uploadImage(formValue) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.cropFile.cropFile).then((response: any) => {
        if (response && response.Location) {
          formValue.image = response.Location;
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  addNewBoard(formBody: any) {
    this._board.addBoard(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateBoard(formBody: any) {
    formBody['boardId'] = this.boardId;
    this._board.updateBoard(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {

    for (const key in this.boardForm.value) {
      if (this.boardForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.cropFile) {
      this.f.image.setErrors({ 'image': true });
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
    this._router.navigate([BOARDS]);
  }

}
