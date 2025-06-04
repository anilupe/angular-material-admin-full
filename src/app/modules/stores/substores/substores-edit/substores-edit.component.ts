import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { StoresService } from 'src/app/shared/services/stores.service';

@Component({
  selector: 'app-stores-edit',
  templateUrl: './substores-edit.component.html',
  styleUrls: ['./substores-edit.component.scss'],
})
export class SubStoresEditComponent implements OnInit {
  loading = false;
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;
  imgFile: string;
  tiendas: any[] = [];
  subtiendaId: string | null = null;
  tiendaId: string | null = null;
  dataLocal: string | null = null;

  constructor(
    private fb: FormBuilder,
    private storesService: StoresService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.dataLocal = localStorage.getItem('subtienda');
    this.tiendaId = localStorage.getItem('idTienda');
    this.form = this.fb.group({
      tiendaId: ['', Validators.required],
      nombre: ['', Validators.required],
      razonSocial: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      ciudad: [''],
      ruc: ['', Validators.required],
      estado: [true],
      imagen: [[]],
    });

    this.cargarTiendas();
  }

  async cargarTiendas() {
    this.cargarTiendas().then(() => {
      if (this.dataLocal) {
        const subtienda = JSON.parse(this.dataLocal);
        this.subtiendaId = subtienda.id;
        this.form.patchValue({
          nombre: subtienda.nombre,
          razonSocial: subtienda.razonSocial,
          direccion: subtienda.direccion,
          telefono: subtienda.telefono,
          ciudad: subtienda.ciudad,
          ruc: subtienda.ruc,
          estado: subtienda.estado,
          tiendaId: subtienda.id,
        });
      }
    });
  }

  imagenSubida(url: string) {
    const imagenes = this.form.value.imagen || [];
    imagenes.push(url);
    this.form.patchValue({ imagen: imagenes });
  }

  imagenEliminada(url: string) {
    const nuevasImagenes = this.form.value.imagen.filter(
      (img: string) => img !== url,
    );
    this.form.patchValue({ imagen: nuevasImagenes });
  }

  async guardarTienda() {
    const data = this.form.value;
    if (this.form.invalid) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      this.loading = true;
      const formValue = this.form.value;
      const subtiendaData = { ...formValue };
      delete subtiendaData.tiendaId;

      await this.storesService.updateSubtienda(
        this.tiendaId,
        this.subtiendaId,
        data,
      );
      this.router.navigate(['/tiendas/stores']);
    } catch (error) {
      console.error('Error al guardar la subtienda:', error);
      alert('Ocurrió un error al guardar la subtienda');
    } finally {
      this.loading = false;
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
