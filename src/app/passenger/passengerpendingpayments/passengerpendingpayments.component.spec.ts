import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerpendingpaymentsComponent } from './passengerpendingpayments.component';

describe('PassengerpendingpaymentsComponent', () => {
  let component: PassengerpendingpaymentsComponent;
  let fixture: ComponentFixture<PassengerpendingpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerpendingpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerpendingpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
