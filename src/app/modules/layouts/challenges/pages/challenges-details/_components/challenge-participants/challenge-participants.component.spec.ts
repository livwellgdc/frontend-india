import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeParticipantsComponent } from './challenge-participants.component';

describe('ChallengeParticipantsComponent', () => {
  let component: ChallengeParticipantsComponent;
  let fixture: ComponentFixture<ChallengeParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
