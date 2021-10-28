import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubAdminsComponent } from './add-edit-sub-admins.component';

describe('AddEditSubAdminsComponent', () => {
  let component: AddEditSubAdminsComponent;
  let fixture: ComponentFixture<AddEditSubAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSubAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSubAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
