import { TestBed } from '@angular/core/testing';

import { AnouncementService } from './anouncement.service';

describe('AnouncementService', () => {
  let service: AnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
