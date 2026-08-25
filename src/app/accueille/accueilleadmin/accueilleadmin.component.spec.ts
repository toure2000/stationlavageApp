import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilleadminComponent } from './accueilleadmin.component';

describe('AccueilleadminComponent', () => {
  let component: AccueilleadminComponent;
  let fixture: ComponentFixture<AccueilleadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilleadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccueilleadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
