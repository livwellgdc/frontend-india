import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessReelsListComponent } from './fitness-reels-list.component';

describe('FitnessReelsListComponent', () => {
  let component: FitnessReelsListComponent;
  let fixture: ComponentFixture<FitnessReelsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessReelsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessReelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
