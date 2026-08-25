import { TestBed } from '@angular/core/testing';

import { EditVoitureService } from './edit-voiture.service';

describe('EditVoitureService', () => {
  let service: EditVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
