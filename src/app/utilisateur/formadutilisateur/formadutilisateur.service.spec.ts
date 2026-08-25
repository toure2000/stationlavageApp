import { TestBed } from '@angular/core/testing';

import { FormadutilisateurService } from './formadutilisateur.service';

describe('FormadutilisateurService', () => {
  let service: FormadutilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormadutilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
