import { TestBed } from '@angular/core/testing';

import { QasService } from './qas.service';

describe('QasService', () => {
  let service: QasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
