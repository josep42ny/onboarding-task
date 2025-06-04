import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('creates', () => {
    expect(service).toBeTruthy();
  });

  it('returns the subject', () => {
    expectLoading(false);
  });

  it('does not load when no http requests are waiting', () => {
    expectLoading(false);
  });

  it('loads when an http request is made', () => {
    service.setLoading('https://example.com', true);

    expectLoading(true);
  });

  it('stops loading when an http request is solved', () => {
    service.setLoading('https://example.com', true);
    service.setLoading('https://example.com', false);

    expectLoading(false);
  });

  function expectLoading(status: boolean): void {
    service.isLoading()
      .subscribe((loading) => {
        expect(loading).toBe(status);
      })
      .unsubscribe();
  }
});
