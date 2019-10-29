import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewparentsComponent } from './viewparents.component';

describe('ViewparentsComponent', () => {
  let component: ViewparentsComponent;
  let fixture: ComponentFixture<ViewparentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewparentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewparentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
