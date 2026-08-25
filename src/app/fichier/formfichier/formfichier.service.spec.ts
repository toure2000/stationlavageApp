import { TestBed } from '@angular/core/testing';

import { FormfichierService } from './formfichier.service';

describe('FormfichierService', () => {
  let service: FormfichierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormfichierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
