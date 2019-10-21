import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpassengersComponent } from './viewpassengers.component';

describe('ViewpassengersComponent', () => {
  let component: ViewpassengersComponent;
  let fixture: ComponentFixture<ViewpassengersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpassengersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
