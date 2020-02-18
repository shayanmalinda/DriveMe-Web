import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactinfoAdminsComponent } from './contactinfo-admins.component';

describe('ContactinfoAdminsComponent', () => {
  let component: ContactinfoAdminsComponent;
  let fixture: ComponentFixture<ContactinfoAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactinfoAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactinfoAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
