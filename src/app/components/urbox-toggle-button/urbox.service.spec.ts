import { TestBed } from '@angular/core/testing';

import { UrboxService } from './urbox.service';

describe('UrboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrboxService = TestBed.get(UrboxService);
    expect(service).toBeTruthy();
  });
});
