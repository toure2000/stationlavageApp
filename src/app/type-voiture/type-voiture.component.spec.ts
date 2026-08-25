import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVoitureComponent } from './type-voiture.component';

describe('TypeVoitureComponent', () => {
  let component: TypeVoitureComponent;
  let fixture: ComponentFixture<TypeVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeVoitureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
