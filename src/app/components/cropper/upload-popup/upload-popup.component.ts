import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCroppedEvent } from '../image-cropper/interfaces';
import { ToastService } from '../../toast-notification/toast.service';

@Component({
  selector: 'lv-upload-popup',
  templateUrl: './upload-popup.component.html',
  styleUrls: ['./upload-popup.component.scss']
})

export class UploadPopupComponent implements OnInit {
  @Output() myEvent = new EventEmitter();
  croppedImageFile: any;
  aspectRatio: any = 4 / 4;
  resizeToWidth: any = 350;
  realImage: any = "";
  cropperarea = false;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  constructor(
    private dialogRef: MatDialogRef<UploadPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastService) { }

  ngOnInit() {
    if (this.data && this.data.inputRatio !== null) {
      this.aspectRatio = this.data.inputRatio;
      this.resizeToWidth = this.data.inputWidth;
    }
  }

  async fileChangeEvent(event: any) {

    if (event.target.files.length <= 0) {
      return;
    }

    // if (event.target.files[0].size < 10000) {
    //   this.toast.info("Please select more than 10 KB image.");
    //   return;
    // }

    if (event.target.files[0].size > 500000) {
      this.toast.info("Please select image of less than 500 KB.");
      return;
    }

    let isValidDimension = await this.getImageDimension(event.target.files[0]);
    if (!isValidDimension) {
      this.toast.info(`Image Dimension should be atleast: ${this.getErrorOnType(this.data.type)} px`);
      return
    }

    let typesOfImages = [];
    if (event.target.files[0].type !== "") {
      typesOfImages = event.target.files[0].type.split("/");
    }


    if (typesOfImages.length !== 0 && (typesOfImages[1].toLowerCase() === "png" || typesOfImages[1].toLowerCase() === "jpg" || typesOfImages[1].toLowerCase() === "jpeg")) {
      this.realImage = event.target.files[0];
      this.imageChangedEvent = event;
    } else {
      this.toast.info("Uploaded file is not a valid image. Only JPG, PNG & JPEG files are allowed");
    }
  }

  getImageDimension(file) {
    return new Promise((res, rej) => {
      let u = URL.createObjectURL(file);
      let img = new Image;
      img.onload = () => {
        switch (this.data.type) {
          case 'CLASS':
          case 'CHALLENGE':
          case 'EVENT':
          case 'REWARD':
            if (img.width >= 400 && img.height >= 300) {
              res(true);
            } else {
              res(false);
            }
            break;
          case 'BANNER':
            if (img.width >= 300 && img.height >= 200) {
              res(true);
            } else {
              res(false);
            }
            break;
          case 'STORIES':
            if (img.width >= 1080 && img.height >= 1920) {
              res(true);
            } else {
              res(false);
            }
            break;
            case 'QUICKLINKS':
              res(true);

              // if (img.width >= 60 && img.height >= 60) {
              //   res(true);
              // } else {
              //   res(false);
              // }
              break;
          default:
            if (img.width >= 300 && img.height >= 300) {
              res(true);
            } else {
              res(false);
            }
            break;
        }
      };
      img.src = u;
    })
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImageFile = event.file;
  }

  dataURLtoFile(dataurl, filename = new Date().getTime() + ".png") {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  cropped() {
    if (!this.croppedImage) {
      this.toast.info("Please select image (Only JPG, PNG & JPEG)");
      return;
    }
    this.croppedImageFile = this.dataURLtoFile(this.croppedImage, this.realImage.name);
    this.dialogRef.close({ cropFile: this.croppedImageFile, cropBase64: this.croppedImage, real: this.realImage });
  }

  cancel() {
    this.dialogRef.close(false);
  }

  getErrorOnType(type: string) {
    switch (type) {
      case 'CLASS':
      case 'CHALLENGE':
      case 'EVENT':
      case 'REWARD':
        return '400 X 300';
      case 'BANNER':
        return '300 X 200';
      case 'STORIES':
        return '1080 X 1920';
      default:
        return '300 X 300';
    }
  }

}

