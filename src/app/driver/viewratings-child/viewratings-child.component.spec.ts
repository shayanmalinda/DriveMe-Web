import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewratingsChildComponent } from './viewratings-child.component';

describe('ViewratingsChildComponent', () => {
  let component: ViewratingsChildComponent;
  let fixture: ComponentFixture<ViewratingsChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewratingsChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewratingsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
