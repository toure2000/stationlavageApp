import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormadlavageComponent } from './formadlavage.component';

describe('FormadlavageComponent', () => {
  let component: FormadlavageComponent;
  let fixture: ComponentFixture<FormadlavageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormadlavageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormadlavageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
