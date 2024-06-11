import { TestBed } from '@angular/core/testing';

import { VideodataService } from './videodata.service';

describe('VideodataService', () => {
  let service: VideodataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideodataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
