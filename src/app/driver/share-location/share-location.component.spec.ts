import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLocationComponent } from './share-location.component';

describe('ShareLocationComponent', () => {
  let component: ShareLocationComponent;
  let fixture: ComponentFixture<ShareLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
