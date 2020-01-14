import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewownersComponent } from './viewowners.component';

describe('ViewownersComponent', () => {
  let component: ViewownersComponent;
  let fixture: ComponentFixture<ViewownersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewownersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewownersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
