import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentprofComponent } from './parentprof.component';

describe('ParentprofComponent', () => {
  let component: ParentprofComponent;
  let fixture: ComponentFixture<ParentprofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentprofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
