import { TestBed } from '@angular/core/testing';

import { ListfichierService } from './listfichier.service';

describe('ListfichierService', () => {
  let service: ListfichierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListfichierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
