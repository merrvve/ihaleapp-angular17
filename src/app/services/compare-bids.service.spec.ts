import { TestBed } from '@angular/core/testing';

import { CompareBidsService } from './compare-bids.service';

describe('CompareBidsService', () => {
  let service: CompareBidsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareBidsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
