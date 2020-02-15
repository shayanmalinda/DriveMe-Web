import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerProfComponent } from './passengerprof.component';

describe('PassengerProfComponent', () => {
  let component: PassengerProfComponent;
  let fixture: ComponentFixture<PassengerProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
