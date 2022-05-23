import { TestBed } from '@angular/core/testing';

import { SwapmateDataService } from './swapmate-data.service';

describe('SwapmateDataService', () => {
  let service: SwapmateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapmateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
