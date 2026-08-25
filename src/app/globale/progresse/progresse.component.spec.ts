import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresseComponent } from './progresse.component';

describe('ProgresseComponent', () => {
  let component: ProgresseComponent;
  let fixture: ComponentFixture<ProgresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
