import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsListingComponent } from './versions-listing.component';

describe('VersionsListingComponent', () => {
  let component: VersionsListingComponent;
  let fixture: ComponentFixture<VersionsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
