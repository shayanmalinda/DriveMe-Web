import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateChildComponent } from './rate-child.component';

describe('RateChildComponent', () => {
  let component: RateChildComponent;
  let fixture: ComponentFixture<RateChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
