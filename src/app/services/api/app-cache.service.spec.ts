import { TestBed } from '@angular/core/testing';

import { CachingInterceptor } from './app-cache.service';

describe('AppCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CachingInterceptor = TestBed.get(CachingInterceptor);
    expect(service).toBeTruthy();
  });
});
