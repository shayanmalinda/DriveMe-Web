import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdriverdetailsComponent } from './editdriverdetails.component';

describe('EditdriverdetailsComponent', () => {
  let component: EditdriverdetailsComponent;
  let fixture: ComponentFixture<EditdriverdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdriverdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdriverdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
