import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClassesComponent } from './add-edit-classes.component';

describe('AddEditClassesComponent', () => {
  let component: AddEditClassesComponent;
  let fixture: ComponentFixture<AddEditClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
