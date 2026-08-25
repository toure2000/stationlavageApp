import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmodifutilisateurComponent } from './formmodifutilisateur.component';

describe('FormmodifutilisateurComponent', () => {
  let component: FormmodifutilisateurComponent;
  let fixture: ComponentFixture<FormmodifutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormmodifutilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormmodifutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
