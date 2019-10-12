import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdriverComponent } from './registerdriver.component';

describe('RegisterdriverComponent', () => {
  let component: RegisterdriverComponent;
  let fixture: ComponentFixture<RegisterdriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterdriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
