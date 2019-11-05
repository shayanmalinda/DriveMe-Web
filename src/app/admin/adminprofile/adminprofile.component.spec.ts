import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprofileComponent } from './adminprofile.component';

describe('AdminprofileComponent', () => {
  let component: AdminprofileComponent;
  let fixture: ComponentFixture<AdminprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
