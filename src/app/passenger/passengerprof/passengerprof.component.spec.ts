import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerprofComponent } from './passengerprof.component';

describe('PassengerprofComponent', () => {
  let component: PassengerprofComponent;
  let fixture: ComponentFixture<PassengerprofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerprofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
