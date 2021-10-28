import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListingComponent } from './rewards-listing.component';

describe('RewardsListingComponent', () => {
  let component: RewardsListingComponent;
  let fixture: ComponentFixture<RewardsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
