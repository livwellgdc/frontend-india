import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsListingComponent } from './clubs-listing.component';

describe('ClubsListingComponent', () => {
  let component: ClubsListingComponent;
  let fixture: ComponentFixture<ClubsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
