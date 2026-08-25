import { TestBed } from '@angular/core/testing';

import { LavageService } from './lavage.service';

describe('LavageService', () => {
  let service: LavageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LavageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
