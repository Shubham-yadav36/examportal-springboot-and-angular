import { TestBed } from '@angular/core/testing';

import { BothguardGuard } from './bothguard.guard';

describe('BothguardGuard', () => {
  let guard: BothguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BothguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
