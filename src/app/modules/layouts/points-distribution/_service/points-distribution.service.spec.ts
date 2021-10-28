import { TestBed } from '@angular/core/testing';

import { PointsDistributionService } from './points-distribution.service';

describe('PointsDistributionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointsDistributionService = TestBed.get(PointsDistributionService);
    expect(service).toBeTruthy();
  });
});
