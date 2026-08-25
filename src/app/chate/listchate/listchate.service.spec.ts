import { TestBed } from '@angular/core/testing';

import { ListchateService } from './listchate.service';

describe('ListchateService', () => {
  let service: ListchateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListchateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
