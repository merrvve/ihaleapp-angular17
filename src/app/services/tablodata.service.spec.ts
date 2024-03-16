import { TestBed } from '@angular/core/testing';

import { TablodataService } from './tablodata.service';

describe('TablodataService', () => {
  let service: TablodataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablodataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
