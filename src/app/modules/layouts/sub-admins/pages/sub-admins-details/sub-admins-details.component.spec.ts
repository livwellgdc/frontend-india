import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminsDetailsComponent } from './sub-admins-details.component';

describe('SubAdminsDetailsComponent', () => {
  let component: SubAdminsDetailsComponent;
  let fixture: ComponentFixture<SubAdminsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
