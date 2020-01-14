import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerpaymentsComponent } from './passengerpayments.component';

describe('PassengerpaymentsComponent', () => {
  let component: PassengerpaymentsComponent;
  let fixture: ComponentFixture<PassengerpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
