import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilleouvrierComponent } from './accueilleouvrier.component';

describe('AccueilleouvrierComponent', () => {
  let component: AccueilleouvrierComponent;
  let fixture: ComponentFixture<AccueilleouvrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilleouvrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccueilleouvrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
