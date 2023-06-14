import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnouncementsComponent } from './anouncements.component';

describe('AnouncementsComponent', () => {
  let component: AnouncementsComponent;
  let fixture: ComponentFixture<AnouncementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnouncementsComponent]
    });
    fixture = TestBed.createComponent(AnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
