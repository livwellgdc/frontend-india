import { TestBed } from '@angular/core/testing';

import { UnAuthCmsService } from './un-auth-cms.service';

describe('UnAuthCmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnAuthCmsService = TestBed.get(UnAuthCmsService);
    expect(service).toBeTruthy();
  });
});
