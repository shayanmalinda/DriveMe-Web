import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsParentComponent } from './payments-parent.component';

describe('PaymentsParentComponent', () => {
  let component: PaymentsParentComponent;
  let fixture: ComponentFixture<PaymentsParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
