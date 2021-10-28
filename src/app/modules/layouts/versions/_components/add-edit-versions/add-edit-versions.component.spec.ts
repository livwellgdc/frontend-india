import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVersionsComponent } from './add-edit-versions.component';

describe('AddEditVersionsComponent', () => {
  let component: AddEditVersionsComponent;
  let fixture: ComponentFixture<AddEditVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
