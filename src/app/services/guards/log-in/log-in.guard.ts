import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { StorageService } from '../../storage/storage.service';
import { DASHBOARD } from '../../../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class LogInGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _storage: StorageService,
  ) { }

  canActivate(): boolean | UrlTree {
    if (this._storage.token) {
      const tree: UrlTree = this._router.parseUrl(DASHBOARD);
      return tree;
    } else {
      return true;
    }
  }
}
