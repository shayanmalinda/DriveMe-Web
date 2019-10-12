import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePassengersComponent } from './rate-passengers.component';

describe('RatePassengersComponent', () => {
  let component: RatePassengersComponent;
  let fixture: ComponentFixture<RatePassengersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatePassengersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatePassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
