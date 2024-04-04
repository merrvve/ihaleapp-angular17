import { TestBed } from '@angular/core/testing';

import { IhaleService } from './ihale.service';

describe('IhaleService', () => {
  let service: IhaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IhaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
