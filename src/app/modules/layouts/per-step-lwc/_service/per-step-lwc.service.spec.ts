import { TestBed } from '@angular/core/testing';

import { PerStepLwcService } from './per-step-lwc.service';

describe('PerStepLwcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerStepLwcService = TestBed.get(PerStepLwcService);
    expect(service).toBeTruthy();
  });
});
