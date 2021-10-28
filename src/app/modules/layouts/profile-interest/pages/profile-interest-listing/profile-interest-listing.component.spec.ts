import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInterestListingComponent } from './profile-interest-listing.component';

describe('ProfileInterestListingComponent', () => {
  let component: ProfileInterestListingComponent;
  let fixture: ComponentFixture<ProfileInterestListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInterestListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInterestListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
