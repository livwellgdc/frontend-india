import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCorporateComponent } from './add-edit-corporate.component';

describe('AddEditCorporateComponent', () => {
  let component: AddEditCorporateComponent;
  let fixture: ComponentFixture<AddEditCorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
