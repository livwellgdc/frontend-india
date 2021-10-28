import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClubsComponent } from './add-edit-clubs.component';

describe('AddEditClubsComponent', () => {
  let component: AddEditClubsComponent;
  let fixture: ComponentFixture<AddEditClubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditClubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
