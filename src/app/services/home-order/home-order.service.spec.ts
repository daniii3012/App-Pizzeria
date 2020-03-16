import { TestBed } from '@angular/core/testing';

import { HomeOrderService } from './home-order.service';

describe('HomeOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeOrderService = TestBed.get(HomeOrderService);
    expect(service).toBeTruthy();
  });
});
