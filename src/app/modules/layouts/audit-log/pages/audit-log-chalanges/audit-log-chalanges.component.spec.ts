import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogChalangesComponent } from './audit-log-chalanges.component';

describe('AuditLogChalangesComponent', () => {
  let component: AuditLogChalangesComponent;
  let fixture: ComponentFixture<AuditLogChalangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLogChalangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogChalangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
