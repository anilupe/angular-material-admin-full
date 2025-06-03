import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { Interest } from 'src/app/shared/models/interest';
import { InteresService } from 'src/app/shared/services/interes.service';
import { InteresModalComponent } from '../dialog/interes-modal/interes-modal.component';

@Component({
  selector: 'app-interes',
  templateUrl: './interes.component.html',
  styleUrls: ['./interes.component.scss'],
})
export class InteresComponent implements OnInit {
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  interests: Interest[] = [];
  editingInterestId: string | null = null;
  loading = false;
  intereses: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'porcentaje', 'estado', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private interestService: InteresService,
  ) {}

  ngOnInit(): void {
    this.cargarIntereses();
  }

  cargarIntereses() {
    this.interestService.getAll().then((data) => {
      const items = Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key],
      }));
      this.intereses.data = items;
    });
  }

  openDialog(interes: any = null): void {
    const dialogRef = this.dialog.open(InteresModalComponent, {
      width: '400px',
      data: interes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.cargarIntereses();
    });
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar este tipo de interés?')) {
      this.interestService.delete(id).then(() => this.cargarIntereses());
    }
  }
}
