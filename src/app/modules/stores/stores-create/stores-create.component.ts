import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { routes, AUTO_COMPLETE_LIMIT } from 'src/app/consts';
import { StoresService } from 'src/app/shared/services/stores.service';

@Component({
  selector: 'app-stores-create',
  templateUrl: './stores-create.component.html',
  styleUrls: ['./stores-create.component.scss'],
})
export class StoresCreateComponent implements OnInit {
  loading = false;
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  imgFile: string;

  constructor(
    private fb: FormBuilder,
    private storesService: StoresService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      ciudad: [''],
      ruc: ['', Validators.required],
      legalRepresentative: ['', Validators.required],
      legalRepresentativeId: ['', Validators.required],
      estado: [true],
      imagen: [[]],
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
    if (this.form.invalid) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      this.loading = true;
      const tiendaData = this.form.value;
      const id = await this.storesService.crearTienda(tiendaData);
      this.router.navigate(['/tiendas/stores']);
    } catch (error) {
      console.error('Error al guardar la tienda:', error);
      alert('Ocurrió un error al guardar la tienda');
    } finally {
      this.loading = false;
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
