import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { Tax } from 'src/app/shared/models/tax';
import { TarifasAsistenciaService } from 'src/app/shared/services/tarifas-asistencia.service';
import { TarifasAsistenciaModalComponent } from '../dialog/tarifas-asistencia-modal/tarifas-asistencia-modal.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tarifas-asistencia',
  templateUrl: './tarifas-asistencia.component.html',
  styleUrls: ['./tarifas-asistencia.component.scss'],
})
export class TarifasAsistenciaComponent implements OnInit {
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  interests: Tax[] = [];
  editingInterestId: string | null = null;
  loading = false;
  intereses: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [
    'nombre',
    'valorInicio',
    'valorFin',
    'estado',
    'contrato',
    'valorTarifa',
    'acciones',
  ];

  constructor(
    private dialog: MatDialog,
    private tarifasService: TarifasAsistenciaService,
  ) {}

  ngOnInit(): void {
    this.cargarIntereses();
  }

  cargarIntereses() {
    this.tarifasService.getAll().then((data) => {
      const items = Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key],
      }));
      this.intereses.data = items;
    });
  }

  openDialog(interes: any = null): void {
    const dialogRef = this.dialog.open(TarifasAsistenciaModalComponent, {
      width: '500px',
      data: interes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.cargarIntereses();
    });
  }

  eliminar(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: '¿Estás seguro de que deseas eliminar este registro?',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
      this.tarifasService.delete(id).then(() => this.cargarIntereses());
    }
  });
  }
}
