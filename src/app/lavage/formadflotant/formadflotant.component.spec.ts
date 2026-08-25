import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormadflotantComponent } from './formadflotant.component';

describe('FormadflotantComponent', () => {
  let component: FormadflotantComponent;
  let fixture: ComponentFixture<FormadflotantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormadflotantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormadflotantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
