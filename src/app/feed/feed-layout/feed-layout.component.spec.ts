import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedLayoutComponent } from './feed-layout.component';

describe('FeedLayoutComponent', () => {
  let component: FeedLayoutComponent;
  let fixture: ComponentFixture<FeedLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedLayoutComponent]
    });
    fixture = TestBed.createComponent(FeedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
