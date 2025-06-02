import { TestBed } from '@angular/core/testing';

import { TestwomboService } from './testwombo.service';

describe('TestwomboService', () => {
  let service: TestwomboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestwomboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
