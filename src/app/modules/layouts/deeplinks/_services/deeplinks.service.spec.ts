import { TestBed } from '@angular/core/testing';

import { DeeplinksService } from './deeplinks.service';

describe('DeeplinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeeplinksService = TestBed.get(DeeplinksService);
    expect(service).toBeTruthy();
  });
});
