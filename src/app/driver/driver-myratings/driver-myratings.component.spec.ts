import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverMyratingsComponent } from './driver-myratings.component';

describe('DriverMyratingsComponent', () => {
  let component: DriverMyratingsComponent;
  let fixture: ComponentFixture<DriverMyratingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverMyratingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverMyratingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
