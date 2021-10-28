import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminsComponent } from './sub-admins.component';

describe('SubAdminsComponent', () => {
  let component: SubAdminsComponent;
  let fixture: ComponentFixture<SubAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
