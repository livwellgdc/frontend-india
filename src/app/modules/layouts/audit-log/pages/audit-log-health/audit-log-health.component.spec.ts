import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogHealthComponent } from './audit-log-health.component';

describe('AuditLogHealthComponent', () => {
  let component: AuditLogHealthComponent;
  let fixture: ComponentFixture<AuditLogHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLogHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
