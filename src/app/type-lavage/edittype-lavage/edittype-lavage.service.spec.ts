import { TestBed } from '@angular/core/testing';

import { EdittypeLavageService } from './edittype-lavage.service';

describe('EdittypeLavageService', () => {
  let service: EdittypeLavageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdittypeLavageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
