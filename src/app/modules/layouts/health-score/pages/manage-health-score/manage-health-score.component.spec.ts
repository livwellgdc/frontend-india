import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHealthScoreComponent } from './manage-health-score.component';

describe('ManageHealthScoreComponent', () => {
  let component: ManageHealthScoreComponent;
  let fixture: ComponentFixture<ManageHealthScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHealthScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHealthScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
