import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesDetailsComponent } from './challenges-details.component';

describe('ChallengesDetailsComponent', () => {
  let component: ChallengesDetailsComponent;
  let fixture: ComponentFixture<ChallengesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
