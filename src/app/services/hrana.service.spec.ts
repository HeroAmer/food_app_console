import { TestBed } from '@angular/core/testing';

import { HranaService } from './hrana.service';

describe('HranaService', () => {
  let service: HranaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HranaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
