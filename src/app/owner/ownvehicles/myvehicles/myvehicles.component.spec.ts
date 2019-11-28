import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvehiclesComponent } from './myvehicles.component';

describe('MyvehiclesComponent', () => {
  let component: MyvehiclesComponent;
  let fixture: ComponentFixture<MyvehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyvehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyvehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
