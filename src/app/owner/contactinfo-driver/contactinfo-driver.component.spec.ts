import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactinfoDriverComponent } from './contactinfo-driver.component';

describe('ContactinfoDriverComponent', () => {
  let component: ContactinfoDriverComponent;
  let fixture: ComponentFixture<ContactinfoDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactinfoDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactinfoDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
