import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientClubsListingComponent } from './client-clubs-listing.component';

describe('ClientClubsListingComponent', () => {
  let component: ClientClubsListingComponent;
  let fixture: ComponentFixture<ClientClubsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientClubsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientClubsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
