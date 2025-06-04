import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasAsistenciaComponent } from './tarifas-asistencia.component';

describe('TarifasAsistenciaComponent', () => {
  let component: TarifasAsistenciaComponent;
  let fixture: ComponentFixture<TarifasAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifasAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
