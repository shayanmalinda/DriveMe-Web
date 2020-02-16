import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRatingsComponent } from './owner-ratings.component';

describe('OwnerRatingsComponent', () => {
  let component: OwnerRatingsComponent;
  let fixture: ComponentFixture<OwnerRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
