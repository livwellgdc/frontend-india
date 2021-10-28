import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSpinWheelsComponent } from './add-edit-spin-wheels.component';

describe('AddEditSpinWheelsComponent', () => {
  let component: AddEditSpinWheelsComponent;
  let fixture: ComponentFixture<AddEditSpinWheelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSpinWheelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSpinWheelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
