import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverviewpassengerdetailsComponent } from './driverviewpassengerdetails.component';

describe('DriverviewpassengerdetailsComponent', () => {
  let component: DriverviewpassengerdetailsComponent;
  let fixture: ComponentFixture<DriverviewpassengerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverviewpassengerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverviewpassengerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
