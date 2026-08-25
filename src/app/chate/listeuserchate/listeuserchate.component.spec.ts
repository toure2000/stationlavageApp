import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeuserchateComponent } from './listeuserchate.component';

describe('ListeuserchateComponent', () => {
  let component: ListeuserchateComponent;
  let fixture: ComponentFixture<ListeuserchateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeuserchateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeuserchateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
