import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeLavageComponent } from './type-lavage.component';

describe('TypeLavageComponent', () => {
  let component: TypeLavageComponent;
  let fixture: ComponentFixture<TypeLavageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeLavageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeLavageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
