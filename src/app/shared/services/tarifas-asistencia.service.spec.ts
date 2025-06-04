import { TestBed } from '@angular/core/testing';

import { TarifasAsistenciaService } from './tarifas-asistencia.service';

describe('TarifasAsistenciaService', () => {
  let service: TarifasAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifasAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
