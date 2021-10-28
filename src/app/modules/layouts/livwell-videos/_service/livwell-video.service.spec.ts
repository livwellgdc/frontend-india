import { TestBed } from '@angular/core/testing';

import { LivwellVideoService } from './livwell-video.service';

describe('LivwellVideoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivwellVideoService = TestBed.get(LivwellVideoService);
    expect(service).toBeTruthy();
  });
});
