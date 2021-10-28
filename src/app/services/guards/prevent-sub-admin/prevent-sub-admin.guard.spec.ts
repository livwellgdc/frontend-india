import { TestBed, async, inject } from '@angular/core/testing';

import { PreventSubAdminGuard } from './prevent-sub-admin.guard';

describe('PreventSubAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventSubAdminGuard]
    });
  });

  it('should ...', inject([PreventSubAdminGuard], (guard: PreventSubAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
