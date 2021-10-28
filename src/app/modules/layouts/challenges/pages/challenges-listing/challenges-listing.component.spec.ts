import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesListingComponent } from './challenges-listing.component';

describe('ChallengesListingComponent', () => {
  let component: ChallengesListingComponent;
  let fixture: ComponentFixture<ChallengesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
