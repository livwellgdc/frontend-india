import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBadgesComponent } from './add-edit-badges.component';

describe('AddEditBadgesComponent', () => {
  let component: AddEditBadgesComponent;
  let fixture: ComponentFixture<AddEditBadgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBadgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
