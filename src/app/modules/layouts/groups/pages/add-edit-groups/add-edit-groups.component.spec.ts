import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGroupsComponent } from './add-edit-groups.component';

describe('AddEditGroupsComponent', () => {
  let component: AddEditGroupsComponent;
  let fixture: ComponentFixture<AddEditGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
