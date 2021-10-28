import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesListingComponent } from './badges-listing.component';

describe('BadgesListingComponent', () => {
  let component: BadgesListingComponent;
  let fixture: ComponentFixture<BadgesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
