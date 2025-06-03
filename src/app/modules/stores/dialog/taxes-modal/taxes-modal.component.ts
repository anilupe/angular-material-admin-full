import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarcaService } from 'src/app/shared/services/marca.service';
import { MarcaModalComponent } from '../marca-modal/marca-modal.component';
import { TaxesService } from 'src/app/shared/services/taxes.service';

@Component({
  selector: 'app-taxes-modal',
  templateUrl: './taxes-modal.component.html',
  styleUrls: ['./taxes-modal.component.scss'],
})
export class TaxesModalComponent implements OnInit {
  form!: FormGroup;
  editingMarcaId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaxesModalComponent>,
    private taxesService: TaxesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      porcentaje: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      estado: [true, Validators.required],
    });

    if (this.data) {
      this.editingMarcaId = this.data.id;
      this.form.patchValue(this.data);
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.editingMarcaId) {
      this.taxesService
        .update(this.editingMarcaId, data)
        .then(() => this.dialogRef.close(true));
    } else {
      this.taxesService.create(data).then(() => this.dialogRef.close(true));
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
