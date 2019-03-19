import { TestBed } from '@angular/core/testing';

import { SingletonLanguageService } from './singleton-language.service';

describe('SingletonLanguageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingletonLanguageService = TestBed.get(SingletonLanguageService);
    expect(service).toBeTruthy();
  });
});
