import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsHistoryListComponent } from './points-history-list.component';

describe('PointsHistoryListComponent', () => {
  let component: PointsHistoryListComponent;
  let fixture: ComponentFixture<PointsHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
