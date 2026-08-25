import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormadtypeVoitureComponent } from './formadtype-voiture.component';

describe('FormadtypeVoitureComponent', () => {
  let component: FormadtypeVoitureComponent;
  let fixture: ComponentFixture<FormadtypeVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormadtypeVoitureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormadtypeVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
