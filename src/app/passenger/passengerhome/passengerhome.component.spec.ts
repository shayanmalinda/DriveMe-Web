import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerhomeComponent } from './passengerhome.component';

describe('PassengerhomeComponent', () => {
  let component: PassengerhomeComponent;
  let fixture: ComponentFixture<PassengerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
