import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDroitComponent } from './button-droit.component';

describe('ButtonDroitComponent', () => {
  let component: ButtonDroitComponent;
  let fixture: ComponentFixture<ButtonDroitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDroitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonDroitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
