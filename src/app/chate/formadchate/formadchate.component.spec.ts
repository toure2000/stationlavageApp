import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormadchateComponent } from './formadchate.component';

describe('FormadchateComponent', () => {
  let component: FormadchateComponent;
  let fixture: ComponentFixture<FormadchateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormadchateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormadchateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
