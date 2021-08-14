import { TestBed } from '@angular/core/testing';

import { DeGuardGuard } from './de-guard.guard';

describe('DeGuardGuard', () => {
  let guard: DeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
