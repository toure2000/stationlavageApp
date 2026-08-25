import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChateComponent } from './chate.component';

describe('ChateComponent', () => {
  let component: ChateComponent;
  let fixture: ComponentFixture<ChateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
