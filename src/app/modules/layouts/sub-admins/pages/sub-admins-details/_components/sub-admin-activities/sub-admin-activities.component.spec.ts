import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminActivitiesComponent } from './sub-admin-activities.component';

describe('SubAdminActivitiesComponent', () => {
  let component: SubAdminActivitiesComponent;
  let fixture: ComponentFixture<SubAdminActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
