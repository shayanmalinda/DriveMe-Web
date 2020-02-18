import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitdrivemeComponent } from './visitdriveme.component';

describe('VisitdrivemeComponent', () => {
  let component: VisitdrivemeComponent;
  let fixture: ComponentFixture<VisitdrivemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitdrivemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitdrivemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
