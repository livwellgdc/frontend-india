import { TestBed } from '@angular/core/testing';

import { SendCodeService } from './send-code.service';

describe('SendCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendCodeService = TestBed.get(SendCodeService);
    expect(service).toBeTruthy();
  });
});
