import { TestBed, async, inject } from '@angular/core/testing';

import { ViewPermissionGuard } from './view-permission.guard';

describe('ViewPermissionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewPermissionGuard]
    });
  });

  it('should ...', inject([ViewPermissionGuard], (guard: ViewPermissionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
