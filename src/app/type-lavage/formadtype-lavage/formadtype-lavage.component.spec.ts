import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormadtypeLavageComponent } from './formadtype-lavage.component';

describe('FormadtypeLavageComponent', () => {
  let component: FormadtypeLavageComponent;
  let fixture: ComponentFixture<FormadtypeLavageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormadtypeLavageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormadtypeLavageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
