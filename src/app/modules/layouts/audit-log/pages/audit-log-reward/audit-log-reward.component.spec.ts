import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogRewardComponent } from './audit-log-reward.component';

describe('AuditLogRewardComponent', () => {
  let component: AuditLogRewardComponent;
  let fixture: ComponentFixture<AuditLogRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLogRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
