import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsPaymentsComponent } from './ratings-payments.component';

describe('RatingsPaymentsComponent', () => {
  let component: RatingsPaymentsComponent;
  let fixture: ComponentFixture<RatingsPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
