import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpaymentsParentComponent } from './viewpayments-parent.component';

describe('ViewpaymentsParentComponent', () => {
  let component: ViewpaymentsParentComponent;
  let fixture: ComponentFixture<ViewpaymentsParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpaymentsParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpaymentsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
