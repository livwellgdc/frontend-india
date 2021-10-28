import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminsListingComponent } from './sub-admins-listing.component';

describe('SubAdminsListingComponent', () => {
  let component: SubAdminsListingComponent;
  let fixture: ComponentFixture<SubAdminsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
