import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcheckpointsComponent } from './viewcheckpoints.component';

describe('ViewcheckpointsComponent', () => {
  let component: ViewcheckpointsComponent;
  let fixture: ComponentFixture<ViewcheckpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcheckpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcheckpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
