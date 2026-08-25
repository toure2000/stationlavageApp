import { TestBed } from '@angular/core/testing';

import { ListutilisateurService } from './listutilisateur.service';

describe('ListutilisateurService', () => {
  let service: ListutilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListutilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
