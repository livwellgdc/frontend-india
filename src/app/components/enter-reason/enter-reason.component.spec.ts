import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterReasonComponent } from './enter-reason.component';

describe('EnterReasonComponent', () => {
  let component: EnterReasonComponent;
  let fixture: ComponentFixture<EnterReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
