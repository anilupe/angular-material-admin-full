import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StoresService } from 'src/app/shared/services/stores.service';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['nombre', 'direccion', 'telefono', 'acciones'];
  loading = false;

  constructor(private storesService: StoresService) {}

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
    console.log('Eliminar tienda con ID:', id);
    // lógica para eliminar
  }
}
