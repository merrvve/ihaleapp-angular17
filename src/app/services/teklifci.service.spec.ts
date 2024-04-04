import { TestBed } from '@angular/core/testing';

import { TeklifciService } from './teklifci.service';

describe('TeklifciService', () => {
  let service: TeklifciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeklifciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
