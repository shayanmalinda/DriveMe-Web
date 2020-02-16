import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerratingspaymentsComponent } from './passengerratingspayments.component';

describe('PassengerratingspaymentsComponent', () => {
  let component: PassengerratingspaymentsComponent;
  let fixture: ComponentFixture<PassengerratingspaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerratingspaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerratingspaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
