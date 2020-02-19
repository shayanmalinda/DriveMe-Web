import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedriverComponent } from './ratedriver.component';

describe('RatedriverComponent', () => {
  let component: RatedriverComponent;
  let fixture: ComponentFixture<RatedriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
