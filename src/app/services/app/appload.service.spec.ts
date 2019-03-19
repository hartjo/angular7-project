import { TestBed } from '@angular/core/testing';

import { ApploadService } from './appload.service';

describe('ApploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApploadService = TestBed.get(ApploadService);
    expect(service).toBeTruthy();
  });
});
