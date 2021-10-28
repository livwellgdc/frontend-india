import { TestBed } from '@angular/core/testing';

import { PointsHistoryService } from './points-history.service';

describe('PointsHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointsHistoryService = TestBed.get(PointsHistoryService);
    expect(service).toBeTruthy();
  });
});
