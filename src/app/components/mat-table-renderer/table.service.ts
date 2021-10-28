import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class TableService {

  private table = new Subject<any>();
  public tableObserve = this.table.asObservable();

  constructor() { }

  tableRender(data: any) {
    setTimeout(() => {
      this.table.next(data);
    }, 10);
  }

}
