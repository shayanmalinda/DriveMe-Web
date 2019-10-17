import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdriversComponent } from './viewdrivers.component';

describe('ViewdriversComponent', () => {
  let component: ViewdriversComponent;
  let fixture: ComponentFixture<ViewdriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
