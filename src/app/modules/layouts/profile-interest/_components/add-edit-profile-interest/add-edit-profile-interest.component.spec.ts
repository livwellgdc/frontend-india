import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProfileInterestComponent } from './add-edit-profile-interest.component';

describe('AddEditProfileInterestComponent', () => {
  let component: AddEditProfileInterestComponent;
  let fixture: ComponentFixture<AddEditProfileInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditProfileInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProfileInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
