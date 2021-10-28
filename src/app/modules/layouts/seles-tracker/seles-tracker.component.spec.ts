import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelesTrackerComponent } from './seles-tracker.component';

describe('SelesTrackerComponent', () => {
  let component: SelesTrackerComponent;
  let fixture: ComponentFixture<SelesTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelesTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelesTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
