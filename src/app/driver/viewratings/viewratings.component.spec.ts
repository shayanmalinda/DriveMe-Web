import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewratingsComponent } from './viewratings.component';

describe('ViewratingsComponent', () => {
  let component: ViewratingsComponent;
  let fixture: ComponentFixture<ViewratingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewratingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewratingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
