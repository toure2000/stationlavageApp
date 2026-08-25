import { TestBed } from '@angular/core/testing';

import { FormadtypeLavageService } from './formadtype-lavage.service';

describe('FormadtypeLavageService', () => {
  let service: FormadtypeLavageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormadtypeLavageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
