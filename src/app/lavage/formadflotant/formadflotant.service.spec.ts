import { TestBed } from '@angular/core/testing';

import { FormadflotantService } from './formadflotant.service';

describe('FormadflotantService', () => {
  let service: FormadflotantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormadflotantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
