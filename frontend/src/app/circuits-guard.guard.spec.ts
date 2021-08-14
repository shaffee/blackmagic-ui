import { TestBed } from '@angular/core/testing';

import { CircuitsGuardGuard } from './circuits-guard.guard';

describe('CircuitsGuardGuard', () => {
  let guard: CircuitsGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CircuitsGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
