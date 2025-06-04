import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { StoresService } from 'src/app/shared/services/stores.service';

@Component({
  selector: 'app-substores-create',
  templateUrl: './substores-create.component.html',
  styleUrls: ['./substores-create.component.scss'],
})
export class SubstoresCreateComponent implements OnInit {
  loading = false;
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  imgFile: string;
  tiendas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private storesService: StoresService,
    private router: Router,
  ) {}

  ngOnInit(): void {
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
    try {
      this.tiendas = await this.storesService.obtenerTiendas();
      this.form.get('tiendaId')?.valueChanges.subscribe((tiendaId) => {
        const tienda = this.tiendas.find((t) => t.id === tiendaId);
        if (tienda?.ruc) {
          this.form.get('ruc')?.setValue(tienda.ruc);
        }
      });
    } catch (error) {
      console.error('Error al obtener tiendas:', error);
    }
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
    if (this.form.invalid) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    try {
      this.loading = true;
      const formValue = this.form.value;
      const tiendaPrincipalId = formValue.tiendaId;
      const subtiendaData = { ...formValue };
      delete subtiendaData.tiendaId;
  
      const id = await this.storesService.crearSubtienda(tiendaPrincipalId, subtiendaData);
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
