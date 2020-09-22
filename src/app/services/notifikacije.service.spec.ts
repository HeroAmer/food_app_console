import { TestBed } from '@angular/core/testing';

import { NotifikacijeService } from './notifikacije.service';

describe('NotifikacijeService', () => {
  let service: NotifikacijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifikacijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
