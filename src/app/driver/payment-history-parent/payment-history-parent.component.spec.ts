import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryParentComponent } from './payment-history-parent.component';

describe('PaymentHistoryParentComponent', () => {
  let component: PaymentHistoryParentComponent;
  let fixture: ComponentFixture<PaymentHistoryParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHistoryParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
