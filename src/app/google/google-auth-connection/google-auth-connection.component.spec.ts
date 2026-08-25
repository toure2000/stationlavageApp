import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthConnectionComponent } from './google-auth-connection.component';

describe('GoogleAuthConnectionComponent', () => {
  let component: GoogleAuthConnectionComponent;
  let fixture: ComponentFixture<GoogleAuthConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAuthConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleAuthConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
