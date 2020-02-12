import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentRatingsComponent } from './recent-ratings.component';

describe('RecentRatingsComponent', () => {
  let component: RecentRatingsComponent;
  let fixture: ComponentFixture<RecentRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
