import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmodiftypeVoitureComponent } from './formmodiftype-voiture.component';

describe('FormmodiftypeVoitureComponent', () => {
  let component: FormmodiftypeVoitureComponent;
  let fixture: ComponentFixture<FormmodiftypeVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormmodiftypeVoitureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormmodiftypeVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
