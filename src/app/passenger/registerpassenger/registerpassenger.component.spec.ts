import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterpassengerComponent } from './registerpassenger.component';

describe('RegisterpassengerComponent', () => {
  let component: RegisterpassengerComponent;
  let fixture: ComponentFixture<RegisterpassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterpassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterpassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
