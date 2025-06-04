import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiempoService } from 'src/app/shared/services/tiempo.service';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-tiempo-modal',
  templateUrl: './tiempo-modal.component.html',
  styleUrls: ['./tiempo-modal.component.scss'],
})
export class TiempoModalComponent implements OnInit {
  form!: FormGroup;
  editingRolId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RolesModalComponent>,
    private tiempoService: TiempoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]],
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
      this.tiempoService
        .update(this.editingRolId, data)
        .then(() => this.dialogRef.close(true));
    } else {
      this.tiempoService.create(data).then(() => this.dialogRef.close(true));
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
