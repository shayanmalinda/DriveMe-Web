import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditparentdetailsComponent } from './editparentdetails.component';

describe('EditparentdetailsComponent', () => {
  let component: EditparentdetailsComponent;
  let fixture: ComponentFixture<EditparentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditparentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditparentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
