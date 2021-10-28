import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClientClubsComponent } from './add-edit-client-clubs.component';

describe('AddEditClientClubsComponent', () => {
  let component: AddEditClientClubsComponent;
  let fixture: ComponentFixture<AddEditClientClubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditClientClubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditClientClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
