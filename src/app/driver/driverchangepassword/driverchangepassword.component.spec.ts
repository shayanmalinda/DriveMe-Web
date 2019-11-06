import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverchangepasswordComponent } from './driverchangepassword.component';

describe('DriverchangepasswordComponent', () => {
  let component: DriverchangepasswordComponent;
  let fixture: ComponentFixture<DriverchangepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverchangepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverchangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
