import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { Rol } from 'src/app/shared/models/rol';
import { RolesService } from 'src/app/shared/services/roles.service';
import { RolesModalComponent } from '../dialog/roles-modal/roles-modal.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  interests: Rol[] = [];
  editingInterestId: string | null = null;
  loading = false;
  intereses: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'acciones'];

  constructor(private dialog: MatDialog, private rolesService: RolesService) {}

  ngOnInit(): void {
    this.cargarIntereses();
  }

  cargarIntereses() {
    this.rolesService.getAll().then((data) => {
      const items = Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key],
      }));
      this.intereses.data = items;
    });
  }

  openDialog(interes: any = null): void {
    const dialogRef = this.dialog.open(RolesModalComponent, {
      width: '400px',
      data: interes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.cargarIntereses();
    });
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar este rol?')) {
      this.rolesService.delete(id).then(() => this.cargarIntereses());
    }
  }
}
