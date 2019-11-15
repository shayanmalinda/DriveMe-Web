import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnvehiclesComponent } from './ownvehicles.component';

describe('OwnvehiclesComponent', () => {
  let component: OwnvehiclesComponent;
  let fixture: ComponentFixture<OwnvehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnvehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnvehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
