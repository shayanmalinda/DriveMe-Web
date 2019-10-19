import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxspinnerComponent } from './ngxspinner.component';

describe('NgxspinnerComponent', () => {
  let component: NgxspinnerComponent;
  let fixture: ComponentFixture<NgxspinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxspinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
