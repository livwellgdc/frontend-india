import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientClubsComponent } from './client-clubs.component';

describe('ClientClubsComponent', () => {
  let component: ClientClubsComponent;
  let fixture: ComponentFixture<ClientClubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientClubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
