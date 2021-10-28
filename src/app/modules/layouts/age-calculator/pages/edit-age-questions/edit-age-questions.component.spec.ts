import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgeQuestionsComponent } from './edit-age-questions.component';

describe('EditAgeQuestionsComponent', () => {
  let component: EditAgeQuestionsComponent;
  let fixture: ComponentFixture<EditAgeQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAgeQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAgeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
