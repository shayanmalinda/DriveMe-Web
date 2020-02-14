import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentRatingsChildComponent } from './recent-ratings-child.component';

describe('RecentRatingsChildComponent', () => {
  let component: RecentRatingsChildComponent;
  let fixture: ComponentFixture<RecentRatingsChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentRatingsChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentRatingsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
