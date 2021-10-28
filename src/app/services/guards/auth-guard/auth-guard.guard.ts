import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { StorageService } from '../../storage/storage.service';
import { Observable } from 'rxjs';
import { ACCOUNT } from '../../../constants/routes';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _storage: StorageService,
  ) { }

  canActivate(): Observable<any> | Promise<any> | any {
    if (this._storage.token) {
      return new Observable(observer => {
        this._storage.getAdminDetail().then(result => {
          observer.next(true);
        }).catch(err => {
          observer.next(false);
        })
      })
    } else {
      const tree: UrlTree = this._router.parseUrl(ACCOUNT);
      return tree;
    }
  }
}
