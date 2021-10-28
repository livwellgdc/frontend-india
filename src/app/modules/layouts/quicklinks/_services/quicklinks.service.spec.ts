import { TestBed } from '@angular/core/testing';

import { QuicklinksService } from './quicklinks.service';

describe('QuicklinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuicklinksService = TestBed.get(QuicklinksService);
    expect(service).toBeTruthy();
  });
});
