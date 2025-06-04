import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { StoresService } from 'src/app/shared/services/stores.service';

@Component({
  selector: 'app-substores-list',
  templateUrl: './substores-list.component.html',
  styleUrls: ['./substores-list.component.scss'],
})
export class SubstoresListComponent implements OnInit {
  public routes: typeof routes = routes;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'tiendaPrincipal',
    'nombre',
    'razonSocial',
    'direccion',
    'telefono',
    'ciudad',
    'ruc',
    'acciones',
  ];
  loading = false;
  subtiendasList: any[] = [];
  nombreTienda = '';
  id: string | null = null;
  constructor(
    private storesService: StoresService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadTienda(this.id);
      this.loadSubtiendas(this.id);
    }
  }

  async loadSubtiendas(id: string) {
    this.loading = true;
    try {
      this.subtiendasList = await this.storesService.obtenerSubtiendas(id);
      console.log('Subtiendas obtenidas:', this.subtiendasList);
      this.dataSource.data = this.subtiendasList;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  edit(row: any) {
    console.log('Editar subtienda:', row);
    // redirigir o abrir modal para editar subtienda
  }

  create() {
    this.router.navigate(['/tiendas/subtiendas/nueva', this.id]);
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: '¿Estás seguro de que deseas eliminar esta subtienda?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.storesService.eliminarSubTienda(id);
          this.ngOnInit();
          this.snackBar.open('Subtienda eliminada correctamente', 'Cerrar', {
            duration: 3000,
          });
        } catch (error) {
          console.error('Error al eliminar:', error);
          this.snackBar.open('Error al eliminar la subtienda', 'Cerrar', {
            duration: 3000,
          });
        }
      }
    }); 
  }

  async loadTienda(id: string) {
    try {
      const tienda = await this.storesService.obtenerTienda(id);
      this.nombreTienda = tienda?.nombre || '';
    } catch (error) {
      console.error('Error al cargar la tienda:', error);
    }
  }
}
