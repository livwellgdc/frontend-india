import { TestBed } from '@angular/core/testing';

import { SelesTrackerService } from './seles-tracker.service';

describe('SelesTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelesTrackerService = TestBed.get(SelesTrackerService);
    expect(service).toBeTruthy();
  });
});
