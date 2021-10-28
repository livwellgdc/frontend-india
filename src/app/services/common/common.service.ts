import { Injectable } from '@angular/core';
import { INVALID_ID_ERROR } from '../../constants/messages';
import { Router } from '@angular/router';
import { ToastService } from '../../components/toast-notification/toast.service';
import { HttpService } from '../http/http.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { isObjEmpty } from '../../constants/helper';
import { CITY_API, CATEGORY_API, REWARD_BY_CATEGORY_ID_API, SELSES_TRACK_LIST_API, SELSES_TRACK_REPORT_API } from '../../constants/api-end-point';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  cityList = [];
  isApiCallInProgress = {
    ofCity: true,
    ofCategory: true,
    ofReward: true,
    ofBadge: true,
    ofClub: true
  }

  constructor(
    private _router: Router,
    private _toast: ToastService,
    private _http: HttpService,
    private _storage: StorageService
  ) { }

  isValidHoursLeftInDay(pageType: string) {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let secondsUntilEndOfDate = (24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60) - seconds;
    switch (pageType) {
      case 'CLASS':
        if (secondsUntilEndOfDate < 9600) {
          return false;
        } else {
          return true;
        }
      case 'EVENT':
        if (secondsUntilEndOfDate < 3900) {
          return false;
        } else {
          return true;
        }
      default:
        return true;
    }
  }

  getCities() {
    return new Promise((resolve, reject) => {
      if (this.cityList.length > 0) {
        resolve(this.cityList);
      } else {
        return this._http.get(CITY_API).pipe(first()).subscribe(response => {
          this.cityList = this.sortList(response.data);
          resolve(this.cityList)
        })
      }
    })
  }

  sortList(listArray, fieldName = 'name') {
    listArray.sort((a, b) => {
      let c1 = a[fieldName].toLowerCase();
      let c2 = b[fieldName].toLowerCase();
      return (c1 < c2) ? -1 : (c1 > c2) ? 1 : 0;
    });
    return listArray;
  }

  getCategories(query) {
    return this._http.get(CATEGORY_API, query);
  }

  getRewards(query) {
    return this._http.get(REWARD_BY_CATEGORY_ID_API, query);
  }

  redirectToAnotherTab(url) {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.setAttribute("target", "_blank");
    anchor.click();
  }

  copyToClipboard(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this._toast.success('Copied to Clipboard !', '', 1000)
  }

  downloadFile(data: any, fileName: string, format: string, domId: string) {

    const blob = new Blob([data], { type: `text/${format}` });

    const url = window.URL.createObjectURL(blob);
    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob);
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    let d = document.getElementById(domId);
    if (d != null) d.appendChild(link);
    link.click();

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  downloadInCsvFormat(dataArrayForDownload, headerDataArray, isArrayType = true, filename = 'coupon_codes') {
    let csvData = this.ConvertToCSV(dataArrayForDownload, headerDataArray, isArrayType);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList, isArrayType) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No.,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        if (isArrayType) {
          line += ',' + array[i];
        } else {
          let head = headerList[index];
          line += ',' + array[i][head];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  isValidCSVFile(file: any) {
    if (file.type === "application/vnd.ms-excel" ||
      file.type === "text/csv" ||
      file.name.endsWith(".csv")) {
      return true;
    } else {
      return false;
    }
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord[1]) {
        csvArr.push(curruntRecord[1]);
      }
    }
    return csvArr;
  }

  isValidId(ID: string) {
    if ((/^[a-f\d]{24}$/i.test(ID))) {
      return true;
    } else {
      this._toast.error(INVALID_ID_ERROR);
      this.navigateNotFound();
    }
  }

  /**
   * @VIEW_ROLE_MANAGEMENT
  */
  viewPermissionHandler(sectionId: string) {
    let permission = this.getPermissionBySectionId(sectionId);
    if (!isObjEmpty(permission)) {
      if (permission.view) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  /**
   * @DETAILS_ROLE_MANAGEMENT
  */
  editPermissionHandler(sectionId: string) {
    let permission = this.getPermissionBySectionId(sectionId);
    if (!isObjEmpty(permission)) {
      if (!permission.addEdit) {
        return 'removeEditIcon';
      }
    }
  }

  /**
   * @RETURN_PERMISSION_DATA
   */
  getPermissionBySectionId(sectionId: string) {
    if (this._storage.adminDetail.permission && this._storage.adminDetail.permission.length > 0) {
      for (let index = 0; index < this._storage.adminDetail.permission.length; index++) {
        if (sectionId == this._storage.adminDetail.permission[index].sectionId) {
          return this._storage.adminDetail.permission[index];
        }
      }
    }
  }

  exportReports(apiEndPoint: string, query: any[] = []) {
    let defaultInfo = {
      params: '',
      adminToken: this._storage.token,
      timeZone: this._storage.getTimeZone()
    }
    if (query.length > 0) {
      for (let i = 0; i < query.length; i++) {
        if (i == 0) {
          defaultInfo.params = "?" + query[i].key + "=" + query[i].value;
        } else {
          defaultInfo.params += "&" + query[i].key + "=" + query[i].value;
        }
      }
    }
    let url = `${environment.API_BASE_PATH}${apiEndPoint}${defaultInfo.params ? defaultInfo.params + `&timezone=${defaultInfo.timeZone}&token=${defaultInfo.adminToken}` : `?timezone=${defaultInfo.timeZone}&token=${defaultInfo.adminToken}`}`;
    window.open(url, '_blank');
  }

  public sendMail(params) {
    return this._http.get(SELSES_TRACK_REPORT_API, params);
  }

  navigateNotFound() {
    this._router.navigate(['404']);
  }

  /**
  * @UNSUBSCRIPTION Unsubscribe all subscriptions to avoid memory leak
  */
  unsubscribe(subscriptions: Subscription[]) {
    subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
