import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValorEntradaService } from 'src/app/shared/services/valor-entrada.service';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-valor-entrada-modal',
  templateUrl: './valor-entrada-modal.component.html',
  styleUrls: ['./valor-entrada-modal.component.scss'],
})
export class ValorEntradaModalComponent implements OnInit {
  form!: FormGroup;
  editingRolId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RolesModalComponent>,
    private entradaService: ValorEntradaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      porcentaje: [''],
      valor: [''],
      estado: [true, Validators.required],
    });

    if (this.data) {
      this.editingRolId = this.data.id;
      this.form.patchValue(this.data);
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.editingRolId) {
      this.entradaService
        .update(this.editingRolId, data)
        .then(() => this.dialogRef.close(true));
    } else {
      this.entradaService.create(data).then(() => this.dialogRef.close(true));
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
