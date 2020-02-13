import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdriverdetailsComponent } from './viewdriverdetails.component';

describe('ViewdriverdetailsComponent', () => {
  let component: ViewdriverdetailsComponent;
  let fixture: ComponentFixture<ViewdriverdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdriverdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdriverdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
