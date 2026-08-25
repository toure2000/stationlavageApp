import { TestBed } from '@angular/core/testing';

import { FormadlavageService } from './formadlavage.service';

describe('FormadlavageService', () => {
  let service: FormadlavageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormadlavageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
