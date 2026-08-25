import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtypeLavageComponent } from './listtype-lavage.component';

describe('ListtypeLavageComponent', () => {
  let component: ListtypeLavageComponent;
  let fixture: ComponentFixture<ListtypeLavageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListtypeLavageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListtypeLavageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
