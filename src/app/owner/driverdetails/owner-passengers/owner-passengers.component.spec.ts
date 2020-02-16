import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPassengersComponent } from './owner-passengers.component';

describe('OwnerPassengersComponent', () => {
  let component: OwnerPassengersComponent;
  let fixture: ComponentFixture<OwnerPassengersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerPassengersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
