import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { routes, AUTO_COMPLETE_LIMIT } from '../../../consts';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';
import { AutoCompleteItem } from '../../../shared/models/common';
import { Rol } from 'src/app/shared/models/rol';
import { UserService } from '../../user/service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { StoresService } from 'src/app/shared/services/stores.service';
import { Store } from 'src/app/shared/models/store';
import { AuthServicesFirebase } from '../../auth/services';
//import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss'],
})
export class UsersCreateComponent implements OnInit {
  loading = false;
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  imgFile: string;
  roles: Rol[] = [];
  tiendas: Store[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: AuthServicesFirebase,
    private roleService: RolesService,
    private tiendaService: StoresService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      phoneNumber: [''],
      tiendaId: ['', Validators.required],
      rolId: ['', Validators.required],
      activo: [true],
      password: ['', Validators.required],
      avatar: [[]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.roles = await this.roleService.getAll();
    this.tiendas = await this.tiendaService.obtenerTiendas();
  }

  async onCreate(): Promise<void> {
    if (this.form.invalid) return;

    const formData = this.form.value;
    const userData = {
      nombre: formData.nombre,
      correo: formData.correo,
      telefono: formData.telefono,
      phoneNumber: formData.phoneNumber,
      tiendaId: formData.tiendaId,
      rolId: formData.rolId,
      activo: formData.activo,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      avatar: formData.avatar || [],
    };

    try {
      await this.userService
        .register(userData.correo, formData.password)
        .then((userCredential) => {
          console.log('Usuario creado:', userCredential);
        });
      //this.router.navigate(['/usuarios']);
    } catch (error) {
      console.error('Error creando usuario:', error);
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuarios']);
  }

  avatarAdd(url: string): void {
    const avatarList = this.form.value.avatar || [];
    this.form.patchValue({ avatar: [...avatarList, url] });
  }

  avatarDel(url: string): void {
    const updatedList = (this.form.value.avatar || []).filter(
      (img: string) => img !== url,
    );
    this.form.patchValue({ avatar: updatedList });
  }
}
