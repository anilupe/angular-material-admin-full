import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarcaService } from 'src/app/shared/services/marca.service';

@Component({
  selector: 'app-marca-modal',
  templateUrl: './marca-modal.component.html',
  styleUrls: ['./marca-modal.component.scss'],
})
export class MarcaModalComponent implements OnInit {
  form!: FormGroup;
  editingMarcaId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MarcaModalComponent>,
    private marcaService: MarcaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
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
      this.marcaService
        .update(this.editingMarcaId, data)
        .then(() => this.dialogRef.close(true));
    } else {
      this.marcaService.create(data).then(() => this.dialogRef.close(true));
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
