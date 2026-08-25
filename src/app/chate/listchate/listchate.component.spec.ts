import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListchateComponent } from './listchate.component';

describe('ListchateComponent', () => {
  let component: ListchateComponent;
  let fixture: ComponentFixture<ListchateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListchateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListchateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
