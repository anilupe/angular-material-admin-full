import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarcaService } from 'src/app/shared/services/marca.service';
import { ModelService } from 'src/app/shared/services/model.service';
import { PhoneService } from 'src/app/shared/services/phone.service';

@Component({
  selector: 'app-phone-modal',
  templateUrl: './phone-modal.component.html',
  styleUrls: ['./phone-modal.component.scss'],
})
export class PhoneModalComponent implements OnInit {
  marcas: any[] = [];
  modelos: any[] = [];
  form!: FormGroup;
  editingPhoneId: string | null = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PhoneModalComponent>,
    private marcaService: MarcaService,
    private modeloService: ModelService,
    private phoneService: PhoneService,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.marcaService.getAll().then((marcas) => {
      this.marcas = marcas;
    });
    this.modeloService.getAll().then((modelos) => {
      this.modelos = modelos;
    });

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      marcaId: ['', Validators.required],
      modeloId: ['', Validators.required],
      color: [''],
      precioMin: [0, Validators.required],
      precioMax: [0, Validators.required],
      estado: [true],
    });

    if (this.data) {
      this.editingPhoneId = this.data.id;
      this.form.patchValue(this.data);
    }
  }
  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.editingPhoneId) {
      this.phoneService
        .update(this.editingPhoneId, data)
        .then(() => this.dialogRef.close(true));
    } else {
      this.phoneService.create(data).then(() => this.dialogRef.close(true));
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
