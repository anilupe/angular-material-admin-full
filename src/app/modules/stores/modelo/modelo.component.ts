import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { Interest } from 'src/app/shared/models/interest';
import { ModelService } from 'src/app/shared/services/model.service';
import { ModeloModalComponent } from '../dialog/modelo-modal/modelo-modal.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss'],
})
export class ModeloComponent implements OnInit {
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  interests: Interest[] = [];
  editingInterestId: string | null = null;
  loading = false;
  intereses: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'estado', 'acciones'];

  constructor(private dialog: MatDialog, private modelService: ModelService) {}

  ngOnInit(): void {
    this.cargarModelos();
  }

  cargarModelos() {
    this.modelService.getAll().then((data) => {
      const items = Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key],
      }));
      this.intereses.data = items;
    });
  }

  openDialog(interes: any = null): void {
    const dialogRef = this.dialog.open(ModeloModalComponent, {
      width: '400px',
      data: interes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.cargarModelos();
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
        this.modelService.delete(id).then(() => this.cargarModelos());
      }
    });
  }
}
