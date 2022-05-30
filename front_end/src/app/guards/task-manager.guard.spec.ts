import { TestBed } from '@angular/core/testing';

import { TaskManagerGuard } from './task-manager.guard';

describe('TaskManagerGuard', () => {
  let guard: TaskManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TaskManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
