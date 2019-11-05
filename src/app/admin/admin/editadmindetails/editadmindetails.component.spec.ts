import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadmindetailsComponent } from './editadmindetails.component';

describe('EditadmindetailsComponent', () => {
  let component: EditadmindetailsComponent;
  let fixture: ComponentFixture<EditadmindetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditadmindetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditadmindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
