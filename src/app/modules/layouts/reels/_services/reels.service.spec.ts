import { TestBed } from '@angular/core/testing';

import { ReelsService } from './reels.service';

describe('ReelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReelsService = TestBed.get(ReelsService);
    expect(service).toBeTruthy();
  });
});
