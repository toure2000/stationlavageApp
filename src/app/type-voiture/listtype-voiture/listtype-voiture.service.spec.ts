import { TestBed } from '@angular/core/testing';

import { ListtypeVoitureService } from './listtype-voiture.service';

describe('ListtypeVoitureService', () => {
  let service: ListtypeVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListtypeVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
