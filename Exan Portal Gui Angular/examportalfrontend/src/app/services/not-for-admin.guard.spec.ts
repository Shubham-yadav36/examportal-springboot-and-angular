import { TestBed } from '@angular/core/testing';

import { NotForAdminGuard } from './not-for-admin.guard';

describe('NotForAdminGuard', () => {
  let guard: NotForAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotForAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
