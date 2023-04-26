import { TestBed } from '@angular/core/testing';

import { HttpAuthService } from './auth-service.service';

describe('AuthService', () => {
  let service: HttpAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
