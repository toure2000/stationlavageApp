import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfichierComponent } from './listfichier.component';

describe('ListfichierComponent', () => {
  let component: ListfichierComponent;
  let fixture: ComponentFixture<ListfichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListfichierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListfichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
