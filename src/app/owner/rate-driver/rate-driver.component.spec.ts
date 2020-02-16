import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDriverComponent } from './rate-driver.component';

describe('RateDriverComponent', () => {
  let component: RateDriverComponent;
  let fixture: ComponentFixture<RateDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
