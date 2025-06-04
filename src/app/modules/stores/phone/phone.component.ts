import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/consts';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { PhoneService } from 'src/app/shared/services/phone.service';
import { ModeloModalComponent } from '../dialog/modelo-modal/modelo-modal.component';
import { Phone } from 'src/app/shared/models/phone';
import { PhoneModalComponent } from '../dialog/phone-modal/phone-modal.component';
import { MarcaService } from 'src/app/shared/services/marca.service';
import { ModelService } from 'src/app/shared/services/model.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {
  public routes: typeof routes = routes;

  intereses: MatTableDataSource<Phone> = new MatTableDataSource();
  displayedColumns: string[] = [
    'nombre',
    'marcaNombre',
    'descripcion',
    'modeloNombre',
    'color',
    'precioMin',
    'precioMax',
    'estado',
    'acciones',
  ];

  constructor(
    private dialog: MatDialog,
    private phoneService: PhoneService,
    private marcaService: MarcaService,
    private modeloService: ModelService,
  ) {}

  ngOnInit(): void {
    this.cargarTelefonos();
  }

  async cargarTelefonos(): Promise<void> {
    const [telefonos, marcas, modelos] = await Promise.all([
      this.phoneService.getAll(),
      this.marcaService.getAll(),
      this.modeloService.getAll(),
    ]);

    const marcasMap: Record<string, string> = {};
    marcas.forEach((marca: any) => {
      marcasMap[marca.id] = marca.nombre;
    });

    const modelosMap: Record<string, string> = {};
    modelos.forEach((modelo: any) => {
      modelosMap[modelo.id] = modelo.nombre;
    });

    // Agregar los nombres al objeto teléfono
    const telefonosConNombres = (telefonos || []).map((tel) => ({
      ...tel,
      marcaNombre: marcasMap[tel.marcaId],
      modeloNombre: modelosMap[tel.modeloId],
    }));

    this.intereses.data = telefonosConNombres;
    console.log('Telefonos cargados:', this.intereses.data);
  }

  openDialog(telefono: Phone | null = null): void {
    const dialogRef = this.dialog.open(PhoneModalComponent, {
      width: '500px',
      data: telefono,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.cargarTelefonos();
    });
  }

  eliminar(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: '¿Estás seguro de que deseas eliminar este registro?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.phoneService.delete(id).then(() => this.cargarTelefonos());
      }
    });
  }
}
