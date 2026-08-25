import { TestBed } from '@angular/core/testing';

import { ChateService } from './chate.service';

describe('ChateService', () => {
  let service: ChateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
