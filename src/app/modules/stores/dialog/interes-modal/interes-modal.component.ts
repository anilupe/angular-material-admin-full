import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InteresService } from 'src/app/shared/services/interes.service';

@Component({
  selector: 'app-interes-modal',
  templateUrl: './interes-modal.component.html',
  styleUrls: ['./interes-modal.component.scss'],
})
export class InteresModalComponent implements OnInit {
  form!: FormGroup;
  editingInterestId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InteresModalComponent>,
    private interestService: InteresService,
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
      this.editingInterestId = this.data.id;
      this.form.patchValue(this.data);
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.editingInterestId) {
      this.interestService
        .update(this.editingInterestId, data)
        .then(() => this.dialogRef.close(true));
    } else {
      this.interestService.create(data).then(() => this.dialogRef.close(true));
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
