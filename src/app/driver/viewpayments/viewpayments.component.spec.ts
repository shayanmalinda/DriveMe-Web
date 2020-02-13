import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpaymentsComponent } from './viewpayments.component';

describe('ViewpaymentsComponent', () => {
  let component: ViewpaymentsComponent;
  let fixture: ComponentFixture<ViewpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
