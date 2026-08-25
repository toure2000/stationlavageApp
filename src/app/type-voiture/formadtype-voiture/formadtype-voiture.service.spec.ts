import { TestBed } from '@angular/core/testing';

import { FormadtypeVoitureService } from './formadtype-voiture.service';

describe('FormadtypeVoitureService', () => {
  let service: FormadtypeVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormadtypeVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
