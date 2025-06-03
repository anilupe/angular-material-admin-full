import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelService } from 'src/app/shared/services/model.service';

@Component({
  selector: 'app-modelo-modal',
  templateUrl: './modelo-modal.component.html',
  styleUrls: ['./modelo-modal.component.scss'],
})
export class ModeloModalComponent implements OnInit {
  form!: FormGroup;
  editingModelId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModeloModalComponent>,
    private modelService: ModelService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],

      estado: [true, Validators.required],
    });

    if (this.data) {
      this.editingModelId = this.data.id;
      this.form.patchValue(this.data);
    }
  }

  guardar() {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.editingModelId) {
      this.modelService
        .update(this.editingModelId, data)
        .then(() => this.dialogRef.close(true));
    } else {
      this.modelService.create(data).then(() => this.dialogRef.close(true));

    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
