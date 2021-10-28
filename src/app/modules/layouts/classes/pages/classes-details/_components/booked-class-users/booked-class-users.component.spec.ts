import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedClassUsersComponent } from './booked-class-users.component';

describe('BookedClassUsersComponent', () => {
  let component: BookedClassUsersComponent;
  let fixture: ComponentFixture<BookedClassUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedClassUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedClassUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
