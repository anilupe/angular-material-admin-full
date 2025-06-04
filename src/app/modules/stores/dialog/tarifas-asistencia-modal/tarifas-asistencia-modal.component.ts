import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxesService } from 'src/app/shared/services/taxes.service';
import { TaxesModalComponent } from '../taxes-modal/taxes-modal.component';
import { TarifasAsistenciaService } from 'src/app/shared/services/tarifas-asistencia.service';

@Component({
  selector: 'app-tarifas-asistencia-modal',
  templateUrl: './tarifas-asistencia-modal.component.html',
  styleUrls: ['./tarifas-asistencia-modal.component.scss'],
})
export class TarifasAsistenciaModalComponent implements OnInit {
  form!: FormGroup;
  editingAsistenciaId: string | null = null;
  archivo: File | null = null;
  archivoNombre: string | null = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TarifasAsistenciaModalComponent>,
    private tarifasService: TarifasAsistenciaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      valorInicio: [''],
      valorFin: [''],
      valorTarifa: ['', Validators.required],
      estado: [true, Validators.required],
      archivo: [],
    });

    if (this.data) {
      this.editingAsistenciaId = this.data.id;
      this.form.patchValue(this.data);
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.editingAsistenciaId) {
      this.tarifasService
        .update(this.editingAsistenciaId, data)
        .then(() => this.dialogRef.close(true));
    } else {
      this.tarifasService.create(data).then(() => this.dialogRef.close(true));
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivo = input.files[0];
      this.archivoNombre = this.archivo.name;
    }
  }
}
