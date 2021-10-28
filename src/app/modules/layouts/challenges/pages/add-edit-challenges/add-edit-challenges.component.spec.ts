import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditChallengesComponent } from './add-edit-challenges.component';

describe('AddEditChallengesComponent', () => {
  let component: AddEditChallengesComponent;
  let fixture: ComponentFixture<AddEditChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
