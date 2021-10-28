import { TestBed } from '@angular/core/testing';

import { HealthScoreService } from './health-score.service';

describe('HealthScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthScoreService = TestBed.get(HealthScoreService);
    expect(service).toBeTruthy();
  });
});
