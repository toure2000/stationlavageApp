import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionGoogleSuccesComponent } from './connection-google-succes.component';

describe('ConnectionGoogleSuccesComponent', () => {
  let component: ConnectionGoogleSuccesComponent;
  let fixture: ComponentFixture<ConnectionGoogleSuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionGoogleSuccesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectionGoogleSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
