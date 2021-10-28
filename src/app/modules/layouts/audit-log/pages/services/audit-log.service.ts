import { Injectable } from '@angular/core';
import { AUDIT_LOG_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()
export class AuditLogService {

  constructor(private _http: HttpService) { }

  public getAuditLogs(query: any) {
    return this._http.get(AUDIT_LOG_API, query);
  }
}
