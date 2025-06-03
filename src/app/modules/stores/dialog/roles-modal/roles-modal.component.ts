import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InteresService } from 'src/app/shared/services/interes.service';
import { InteresModalComponent } from '../interes-modal/interes-modal.component';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss'],
})
export class RolesModalComponent implements OnInit {
  form!: FormGroup;
  editingRolId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RolesModalComponent>,
    private rolesService: RolesService,
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
      this.rolesService
        .update(this.editingRolId, data)
        .then(() => this.dialogRef.close(true));
    } else {
      this.rolesService.create(data).then(() => this.dialogRef.close(true));
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
