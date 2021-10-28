import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeCalQuestionsComponent } from './age-cal-questions.component';

describe('AgeCalQuestionsComponent', () => {
  let component: AgeCalQuestionsComponent;
  let fixture: ComponentFixture<AgeCalQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeCalQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeCalQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
