import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverratingsComponent } from './driverratings.component';

describe('DriverratingsComponent', () => {
  let component: DriverratingsComponent;
  let fixture: ComponentFixture<DriverratingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverratingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverratingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
