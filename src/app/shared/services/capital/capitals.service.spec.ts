import { TestBed } from '@angular/core/testing';

import { CapitalsService } from './capitals.service';

describe('CapitalService', () => {
  let service: CapitalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
