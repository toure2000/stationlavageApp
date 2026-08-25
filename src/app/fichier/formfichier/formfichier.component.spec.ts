import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfichierComponent } from './formfichier.component';

describe('FormfichierComponent', () => {
  let component: FormfichierComponent;
  let fixture: ComponentFixture<FormfichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormfichierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormfichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
