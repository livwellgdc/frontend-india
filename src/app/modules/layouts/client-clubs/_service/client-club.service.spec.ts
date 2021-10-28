import { TestBed } from '@angular/core/testing';

import { ClientClubService } from './client-club.service';

describe('ClientClubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientClubService = TestBed.get(ClientClubService);
    expect(service).toBeTruthy();
  });
});
