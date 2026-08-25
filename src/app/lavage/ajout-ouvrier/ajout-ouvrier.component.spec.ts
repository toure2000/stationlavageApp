import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutOuvrierComponent } from './ajout-ouvrier.component';

describe('AjoutOuvrierComponent', () => {
  let component: AjoutOuvrierComponent;
  let fixture: ComponentFixture<AjoutOuvrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutOuvrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutOuvrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
