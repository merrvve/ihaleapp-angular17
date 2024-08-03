import { TestBed } from '@angular/core/testing';

import { CompareTablesService } from './compare-tables.service';

describe('CompareTablesService', () => {
  let service: CompareTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
