import { TestBed } from '@angular/core/testing';

import { SpinWheelsService } from './spin-wheels.service';

describe('SpinWheelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinWheelsService = TestBed.get(SpinWheelsService);
    expect(service).toBeTruthy();
  });
});
