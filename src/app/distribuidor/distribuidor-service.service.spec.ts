import { TestBed } from '@angular/core/testing';

import { DistribuidorServiceService } from './distribuidor-service.service';

describe('DistribuidorServiceService', () => {
  let service: DistribuidorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistribuidorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
