import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerprofileComponent } from './ownerprofile.component';

describe('OwnerprofileComponent', () => {
  let component: OwnerprofileComponent;
  let fixture: ComponentFixture<OwnerprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
