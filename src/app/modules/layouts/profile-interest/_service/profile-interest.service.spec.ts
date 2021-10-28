import { TestBed } from '@angular/core/testing';

import { ProfileInterestService } from './profile-interest.service';

describe('ProfileInterestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileInterestService = TestBed.get(ProfileInterestService);
    expect(service).toBeTruthy();
  });
});
