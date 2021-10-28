import { TestBed } from '@angular/core/testing';

import { FitnessReelsService } from './fitness-reels.service';

describe('FitnessReelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FitnessReelsService = TestBed.get(FitnessReelsService);
    expect(service).toBeTruthy();
  });
});
