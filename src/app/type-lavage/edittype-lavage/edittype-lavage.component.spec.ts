import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittypeLavageComponent } from './edittype-lavage.component';

describe('EdittypeLavageComponent', () => {
  let component: EdittypeLavageComponent;
  let fixture: ComponentFixture<EdittypeLavageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdittypeLavageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdittypeLavageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
