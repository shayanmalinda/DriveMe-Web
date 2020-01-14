import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerprofileComponent } from './passengerprofile.component';

describe('PassengerprofileComponent', () => {
  let component: PassengerprofileComponent;
  let fixture: ComponentFixture<PassengerprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
