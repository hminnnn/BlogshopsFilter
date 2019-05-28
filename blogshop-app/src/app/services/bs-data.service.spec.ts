import { TestBed } from '@angular/core/testing';

import { BsDataService } from './bs-data.service';

describe('BsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BsDataService = TestBed.get(BsDataService);
    expect(service).toBeTruthy();
  });
});
