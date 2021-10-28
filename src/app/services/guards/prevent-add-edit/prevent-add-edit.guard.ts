import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { StorageService } from '../../storage/storage.service';
import { DASHBOARD } from '../../../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class PreventAddEditGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _storage: StorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(this._storage.adminDetail.userType == "ADMIN") {
      return true;
    }
    if (this._storage.adminDetail.permission && this._storage.adminDetail.permission.length > 0) {
      for (let index = 0; index < this._storage.adminDetail.permission.length; index++) {
        if (route.data.roles == this._storage.adminDetail.permission[index].sectionId) {
          if (!this._storage.adminDetail.permission[index].addEdit) {
            this._router.navigate([DASHBOARD]);
            return false;
          } else {
            return true;
          }
        }
      }
    } else {
      return true;
    }
  }

}
