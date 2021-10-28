import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCharityComponent } from './add-edit-charity.component';

describe('AddEditCharityComponent', () => {
  let component: AddEditCharityComponent;
  let fixture: ComponentFixture<AddEditCharityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCharityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
