import { TestBed } from '@angular/core/testing';

import { ReadDataService } from './read-data.service';

describe('ReadDataService', () => {
  let service: ReadDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
