import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdetailsComponent } from './editdetails.component';

describe('EditdetailsComponent', () => {
  let component: EditdetailsComponent;
  let fixture: ComponentFixture<EditdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
