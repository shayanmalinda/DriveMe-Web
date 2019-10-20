import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpassengerdetailsComponent } from './editpassengerdetails.component';

describe('EditpassengerdetailsComponent', () => {
  let component: EditpassengerdetailsComponent;
  let fixture: ComponentFixture<EditpassengerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpassengerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpassengerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
