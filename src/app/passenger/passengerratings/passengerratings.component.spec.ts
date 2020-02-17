import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerratingsComponent } from './passengerratings.component';

describe('PassengerratingsComponent', () => {
  let component: PassengerratingsComponent;
  let fixture: ComponentFixture<PassengerratingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerratingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerratingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
