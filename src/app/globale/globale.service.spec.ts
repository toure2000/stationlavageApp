import { TestBed } from '@angular/core/testing';

import { GlobaleService } from './globale.service';

describe('GlobaleService', () => {
  let service: GlobaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
