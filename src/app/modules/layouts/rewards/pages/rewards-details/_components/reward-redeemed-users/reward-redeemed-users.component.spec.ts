import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardRedeemedUsersComponent } from './reward-redeemed-users.component';

describe('RewardRedeemedUsersComponent', () => {
  let component: RewardRedeemedUsersComponent;
  let fixture: ComponentFixture<RewardRedeemedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardRedeemedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardRedeemedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
