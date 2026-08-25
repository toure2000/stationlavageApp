import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtypeVoitureComponent } from './listtype-voiture.component';

describe('ListtypeVoitureComponent', () => {
  let component: ListtypeVoitureComponent;
  let fixture: ComponentFixture<ListtypeVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListtypeVoitureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListtypeVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
