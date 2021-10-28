import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientClubsDetailsComponent } from './client-clubs-details.component';

describe('ClientClubsDetailsComponent', () => {
  let component: ClientClubsDetailsComponent;
  let fixture: ComponentFixture<ClientClubsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientClubsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientClubsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
