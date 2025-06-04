import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { ValorEntrada } from 'src/app/shared/models/valor-entrada';
import { ValorEntradaService } from 'src/app/shared/services/valor-entrada.service';
import { TiempoModalComponent } from '../dialog/tiempo-modal/tiempo-modal.component';
import { ValorEntradaModalComponent } from '../dialog/valor-entrada-modal/valor-entrada-modal.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss'],
})
export class EntradaComponent implements OnInit {
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  interests: ValorEntrada[] = [];
  editingInterestId: string | null = null;
  loading = false;
  intereses: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [
    'nombre',
    'porcentaje',
    'valor',
    'estado',
    'acciones',
  ];

  constructor(
    private dialog: MatDialog,
    private tiempoService: ValorEntradaService,
  ) {}

  ngOnInit(): void {
    this.cargarIntereses();
  }

  cargarIntereses() {
    this.tiempoService.getAll().then((data) => {
      const items = Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key],
      }));
      this.intereses.data = items;
    });
  }

  openDialog(interes: any = null): void {
    const dialogRef = this.dialog.open(ValorEntradaModalComponent, {
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
        try {
          await this.tiempoService.delete(id);
          this.cargarIntereses();
        } catch (error) {
          console.error('Error al eliminar la entrada:', error);
        }
      }
    });
  }
}
