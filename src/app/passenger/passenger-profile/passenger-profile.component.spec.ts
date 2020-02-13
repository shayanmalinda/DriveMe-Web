import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerProfileComponent } from './passenger-profile.component';

describe('PassengerProfileComponent', () => {
  let component: PassengerProfileComponent;
  let fixture: ComponentFixture<PassengerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
