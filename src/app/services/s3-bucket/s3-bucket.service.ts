import { Injectable } from '@angular/core';
import { S3 } from 'aws-sdk/clients/all';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../components/toast-notification/toast.service';
import { LoaderService } from '../../components/loader/loader.service';
import { S3_BUCKET_ERROR } from '../../constants/messages';

@Injectable()

export class S3BucketService {

  private _server: S3;

  constructor(private _toast: ToastService, private _loader: LoaderService) {
    this._server = new S3({
      accessKeyId: environment.s3.AWS_ACCESS_KEY,
      secretAccessKey: environment.s3.AWS_SECRET_KEY,
      region: environment.s3.REGION,
    });
  }

  async deleteFile(fileName: string) {
    const params = {
      Bucket: environment.s3.BUCKET_NAME,
      Key: fileName,
    };
    const deleteRequest = this._server.deleteObject(params);
    return await deleteRequest.promise();
  }

  async uploadFile(fileToUpload: File) {
    try {
      const params = {
        Bucket: environment.s3.BUCKET_NAME,
        Key: fileToUpload.name || new Date().getTime() + '.png',
        Body: fileToUpload,
        ACL: 'public-read',
        ContentType: fileToUpload.type   //To prevent download
      };
      this._loader.show();
      return new Promise((resolve, reject) => {
        this._server.upload(params, (err, data) => {
          if (err) {
            this._toast.error(S3_BUCKET_ERROR);
            reject(err);
            return false;
          } else {
            resolve(data);
          }
          this._loader.hide();
        }).on('httpUploadProgress', (progress) => {
        });

      });
    } catch (err) {
      this._loader.hide();
      this._toast.error(S3_BUCKET_ERROR);
      return Promise.reject(err);
    }
  }

  async uploadMultipleFiles(files) {
    try {
      this._loader.show();
      let data = [];
      for (let i = 0; i < files.length; i++) {
        data.push(this.uploadFile(files[i]));
      }
      let result = await Promise.all(data);
      this._loader.hide();
      return Promise.resolve(result);
    } catch (err) {
      this._toast.error(S3_BUCKET_ERROR);
      this._loader.hide();
      return Promise.reject(err);
    }
  }

}
