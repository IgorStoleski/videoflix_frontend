import { TestBed } from '@angular/core/testing';

import { VideoService } from './videodata.service';

describe('VideodataService', () => {
  let service: VideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
