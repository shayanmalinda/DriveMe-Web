import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditownerdetailsComponent } from './editownerdetails.component';

describe('EditownerdetailsComponent', () => {
  let component: EditownerdetailsComponent;
  let fixture: ComponentFixture<EditownerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditownerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditownerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
