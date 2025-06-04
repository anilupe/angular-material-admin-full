import { TestBed } from '@angular/core/testing';

import { ValorEntradaService } from './valor-entrada.service';

describe('ValorEntradaService', () => {
  let service: ValorEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValorEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
