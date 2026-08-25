import { TestBed } from '@angular/core/testing';

import { FormmodiflavageService } from './formmodiflavage.service';

describe('FormmodiflavageService', () => {
  let service: FormmodiflavageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormmodiflavageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
