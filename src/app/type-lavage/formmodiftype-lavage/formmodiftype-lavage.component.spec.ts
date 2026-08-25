import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmodiftypeLavageComponent } from './formmodiftype-lavage.component';

describe('FormmodiftypeLavageComponent', () => {
  let component: FormmodiftypeLavageComponent;
  let fixture: ComponentFixture<FormmodiftypeLavageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormmodiftypeLavageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormmodiftypeLavageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
