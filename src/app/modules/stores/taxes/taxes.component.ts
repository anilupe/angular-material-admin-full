import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { Tax } from 'src/app/shared/models/tax';
import { TaxesService } from 'src/app/shared/services/taxes.service';
import { TaxesModalComponent } from '../dialog/taxes-modal/taxes-modal.component';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {

  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  interests: Tax[] = [];
  editingInterestId: string | null = null;
  loading = false;
  intereses: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'porcentaje', 'estado', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private taxesService: TaxesService,
  ) {}

  ngOnInit(): void {
    this.cargarIntereses();
  }

  cargarIntereses() {
    this.taxesService.getAll().then((data) => {
      const items = Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key],
      }));
      this.intereses.data = items;
    });
  }

  openDialog(interes: any = null): void {
    const dialogRef = this.dialog.open(TaxesModalComponent, {
      width: '400px',
      data: interes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.cargarIntereses();
    });
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar este tipo de interés?')) {
      this.taxesService.delete(id).then(() => this.cargarIntereses());
    }
  }
}
