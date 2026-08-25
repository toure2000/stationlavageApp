import { TestBed } from '@angular/core/testing';

import { TypeLavageService } from './type-lavage.service';

describe('TypeLavageService', () => {
  let service: TypeLavageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeLavageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
