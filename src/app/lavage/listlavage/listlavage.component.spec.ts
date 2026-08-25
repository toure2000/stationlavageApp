import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListlavageComponent } from './listlavage.component';

describe('ListlavageComponent', () => {
  let component: ListlavageComponent;
  let fixture: ComponentFixture<ListlavageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListlavageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListlavageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
