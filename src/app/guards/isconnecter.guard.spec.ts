import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isconnecterGuard } from './isconnecter.guard';

describe('isconnecterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isconnecterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
