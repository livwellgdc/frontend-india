import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInterestDetailsComponent } from './profile-interest-details.component';

describe('ProfileInterestDetailsComponent', () => {
  let component: ProfileInterestDetailsComponent;
  let fixture: ComponentFixture<ProfileInterestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInterestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInterestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
