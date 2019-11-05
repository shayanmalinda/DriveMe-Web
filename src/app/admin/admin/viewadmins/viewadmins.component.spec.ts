import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewadminsComponent } from './viewadmins.component';

describe('ViewadminsComponent', () => {
  let component: ViewadminsComponent;
  let fixture: ComponentFixture<ViewadminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewadminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
