import { TestBed } from '@angular/core/testing';

import { BidReportService } from './bid-report.service';

describe('BidReportService', () => {
  let service: BidReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
