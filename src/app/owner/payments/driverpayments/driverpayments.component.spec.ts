import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverpaymentsComponent } from './driverpayments.component';

describe('DriverpaymentsComponent', () => {
  let component: DriverpaymentsComponent;
  let fixture: ComponentFixture<DriverpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
