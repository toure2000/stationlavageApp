import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBareComponent } from './top-bare.component';

describe('TopBareComponent', () => {
  let component: TopBareComponent;
  let fixture: ComponentFixture<TopBareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
