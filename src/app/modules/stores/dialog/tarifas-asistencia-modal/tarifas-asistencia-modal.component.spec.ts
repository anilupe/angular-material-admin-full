import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasAsistenciaModalComponent } from './tarifas-asistencia-modal.component';

describe('TarifasAsistenciaModalComponent', () => {
  let component: TarifasAsistenciaModalComponent;
  let fixture: ComponentFixture<TarifasAsistenciaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasAsistenciaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifasAsistenciaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
