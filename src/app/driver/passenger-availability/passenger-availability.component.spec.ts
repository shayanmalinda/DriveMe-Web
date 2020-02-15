import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAvailabilityComponent } from './passenger-availability.component';

describe('PassengerAvailabilityComponent', () => {
  let component: PassengerAvailabilityComponent;
  let fixture: ComponentFixture<PassengerAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
