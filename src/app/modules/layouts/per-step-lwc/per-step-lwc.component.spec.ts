import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerStepLwcComponent } from './per-step-lwc.component';

describe('PerStepLwcComponent', () => {
  let component: PerStepLwcComponent;
  let fixture: ComponentFixture<PerStepLwcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerStepLwcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerStepLwcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
