import { TestBed } from '@angular/core/testing';

import { ListtypeLavageService } from './listtype-lavage.service';

describe('ListtypeLavageService', () => {
  let service: ListtypeLavageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListtypeLavageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
