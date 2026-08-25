import { TestBed } from '@angular/core/testing';

import { ProgresseService } from './progresse.service';

describe('ProgresseService', () => {
  let service: ProgresseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgresseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
