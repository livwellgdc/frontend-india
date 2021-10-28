import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivwellVideosListingComponent } from './livwell-videos-listing.component';

describe('LivwellVideosListingComponent', () => {
  let component: LivwellVideosListingComponent;
  let fixture: ComponentFixture<LivwellVideosListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivwellVideosListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivwellVideosListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
