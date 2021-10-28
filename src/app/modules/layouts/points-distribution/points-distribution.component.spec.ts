import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsDistributionComponent } from './points-distribution.component';

describe('PointsDistributionComponent', () => {
  let component: PointsDistributionComponent;
  let fixture: ComponentFixture<PointsDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
