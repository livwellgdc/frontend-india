import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsArrangementComponent } from './seats-arrangement.component';

describe('SeatsArrangementComponent', () => {
  let component: SeatsArrangementComponent;
  let fixture: ComponentFixture<SeatsArrangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsArrangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
