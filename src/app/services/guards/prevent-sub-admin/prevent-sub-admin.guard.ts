import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../../storage/storage.service';
import { DASHBOARD } from '../../../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class PreventSubAdminGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _storage: StorageService,
  ) { }

  canActivate(): boolean {
    if (this._storage.adminDetail.userType != 'ADMIN') {
      this._router.navigate([DASHBOARD]);
      return false;
    } else {
      return true;
    }
  }

}
