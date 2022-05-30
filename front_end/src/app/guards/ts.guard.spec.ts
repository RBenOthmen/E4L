import { TestBed } from '@angular/core/testing';

import { TsGuard } from './ts.guard';

describe('TsGuard', () => {
  let guard: TsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
