import { TestBed } from '@angular/core/testing';

import { RecibosService } from './recibos.service';

describe('RecibosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecibosService = TestBed.get(RecibosService);
    expect(service).toBeTruthy();
  });
});
