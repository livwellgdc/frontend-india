import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessReelsComponent } from './fitness-reels.component';

describe('FitnessReelsComponent', () => {
  let component: FitnessReelsComponent;
  let fixture: ComponentFixture<FitnessReelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessReelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessReelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
