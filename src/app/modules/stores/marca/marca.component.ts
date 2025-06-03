import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { Brand } from 'src/app/shared/models/brand';
import { MarcaService } from 'src/app/shared/services/marca.service';
import { MarcaModalComponent } from '../dialog/marca-modal/marca-modal.component';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  interests: Brand[] = [];
  editingInterestId: string | null = null;
  loading = false;
  marcas: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['nombre','estado', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private marcaService: MarcaService,
  ) {}

  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.marcaService.getAll().then((data) => {
      const items = Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key],
      }));
      this.marcas.data = items;
    });
  }

  openDialog(interes: any = null): void {
    const dialogRef = this.dialog.open(MarcaModalComponent, {
      width: '400px',
      data: interes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.cargarMarcas();
    });
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar esta marca?')) {
      this.marcaService.delete(id).then(() => this.cargarMarcas());
    }
  }
}
