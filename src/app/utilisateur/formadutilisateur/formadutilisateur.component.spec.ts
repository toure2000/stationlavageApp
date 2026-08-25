import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormadutilisateurComponent } from './formadutilisateur.component';

describe('FormadutilisateurComponent', () => {
  let component: FormadutilisateurComponent;
  let fixture: ComponentFixture<FormadutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormadutilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormadutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
