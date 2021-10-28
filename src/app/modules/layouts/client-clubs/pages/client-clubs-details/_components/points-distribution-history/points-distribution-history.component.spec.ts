import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsDistributionHistoryComponent } from './points-distribution-history.component';

describe('PointsDistributionHistoryComponent', () => {
  let component: PointsDistributionHistoryComponent;
  let fixture: ComponentFixture<PointsDistributionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsDistributionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsDistributionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
