import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmodiflavageComponent } from './formmodiflavage.component';

describe('FormmodiflavageComponent', () => {
  let component: FormmodiflavageComponent;
  let fixture: ComponentFixture<FormmodiflavageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormmodiflavageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormmodiflavageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
