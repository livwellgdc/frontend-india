import { TestBed, async, inject } from '@angular/core/testing';

import { PreventAddEditGuard } from './prevent-add-edit.guard';

describe('PreventAddEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventAddEditGuard]
    });
  });

  it('should ...', inject([PreventAddEditGuard], (guard: PreventAddEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
