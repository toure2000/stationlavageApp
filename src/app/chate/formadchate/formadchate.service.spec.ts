import { TestBed } from '@angular/core/testing';

import { FormadchateService } from './formadchate.service';

describe('FormadchateService', () => {
  let service: FormadchateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormadchateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
