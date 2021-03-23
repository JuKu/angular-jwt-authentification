import { TestBed } from '@angular/core/testing';

import { JwtAuthLibService } from './jwt-auth-lib.service';

describe('JwtAuthLibService', () => {
  let service: JwtAuthLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtAuthLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
