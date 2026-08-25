import { TestBed } from '@angular/core/testing';

import { ListlavageService } from './listlavage.service';

describe('ListlavageService', () => {
  let service: ListlavageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListlavageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
