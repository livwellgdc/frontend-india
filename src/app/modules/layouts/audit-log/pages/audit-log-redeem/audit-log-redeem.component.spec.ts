import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogPointHistoryComponent } from './audit-log-redeem.component';

describe('AuditLogRedeemComponent', () => {
  let component: AuditLogPointHistoryComponent;
  let fixture: ComponentFixture<AuditLogPointHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLogPointHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogPointHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
