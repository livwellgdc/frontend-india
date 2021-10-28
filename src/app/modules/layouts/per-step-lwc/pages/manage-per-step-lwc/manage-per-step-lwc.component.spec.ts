import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePerStepLwcComponent } from './manage-per-step-lwc.component';

describe('ManagePerStepLwcComponent', () => {
  let component: ManagePerStepLwcComponent;
  let fixture: ComponentFixture<ManagePerStepLwcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePerStepLwcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePerStepLwcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
