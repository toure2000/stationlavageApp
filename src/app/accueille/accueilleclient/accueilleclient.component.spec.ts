import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilleclientComponent } from './accueilleclient.component';

describe('AccueilleclientComponent', () => {
  let component: AccueilleclientComponent;
  let fixture: ComponentFixture<AccueilleclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilleclientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccueilleclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
