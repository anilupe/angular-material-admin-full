import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/consts';
import { StoresService } from 'src/app/shared/services/stores.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss'],
})
export class StoresListComponent implements OnInit {
  public routes: typeof routes = routes;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'nombre',
    'direccion',
    'telefono',
    'ruc',
    'representanteLegal',
    'cedulaRepresentante',
    'acciones',
  ];
  loading = false;

  constructor(
    private storesService: StoresService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getTiendas();
  }

  async getTiendas() {
    this.loading = true;
    try {
      const tiendas = await this.storesService.obtenerTiendas();
      this.dataSource.data = tiendas;
    } catch (error) {
      console.error('Error al cargar tiendas:', error);
    } finally {
      this.loading = false;
    }
  }

  edit(row: any) {
    console.log('Editar tienda:', row);
    // redirigir o abrir modal
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: '¿Estás seguro de que deseas eliminar esta tienda?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.storesService.eliminarTienda(id);
          this.getTiendas();
          this.snackBar.open('Tienda eliminada correctamente', 'Cerrar', {
            duration: 3000,
          });
        } catch (error) {
          console.error('Error al eliminar:', error);
          this.snackBar.open('Error al eliminar la tienda', 'Cerrar', {
            duration: 3000,
          });
        }
      }
    });
  }
}
