import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { routes, AUTO_COMPLETE_LIMIT } from '../../../consts';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';
import { AuthServicesFirebase } from '../../auth/services';
import { RolesService } from 'src/app/shared/services/roles.service';
import { StoresService } from 'src/app/shared/services/stores.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent implements OnInit {
  selectedUsers: any = null;
  loading = false;
  public routes: typeof routes = routes;
  form: UntypedFormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;
  selectedId = this.route.snapshot.params.id;
  imgFile: string;
  roles: any[] = [];
  stores: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private dataFormatterService: DataFormatterService,
    private userService: AuthServicesFirebase,
    private roleService: RolesService,
    private storeService: StoresService,
  ) {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      email: [''],
      roleId: ['', Validators.required], // ID del rol
      storeId: ['', Validators.required], // ID de la tienda
      disabled: [false],
      avatar: [[]],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedId = params['id'];
      this.getRoles();
      this.getStores();
      this.getUsersById();
    });
  }

  private async getRoles(): Promise<void> {
    try {
      const res = await this.roleService.getAll();
      this.roles = res;
    } catch (error) {
      console.error('Error al obtener tiendas:', error);
      this.toastr.error('No se pudieron cargar las tiendas');
    }
  }

  private async getStores(): Promise<void> {
    try {
      const res = await this.storeService.obtenerTiendas();
      this.stores = res;
    } catch (error) {
      console.error('Error al obtener tiendas:', error);
      this.toastr.error('No se pudieron cargar las tiendas');
    }
  }

  avatarAdd(val): void {
    const currentAvatars = this.form.get('avatar')?.value || [];
    this.form.get('avatar')?.setValue([...currentAvatars, val]);
  }

  avatarDel(id): void {
    const currentAvatars = this.form.get('avatar')?.value || [];
    this.form
      .get('avatar')
      ?.setValue(currentAvatars.filter((img) => img.id !== id));
  }

  onSave(): void {
    // Implementa lógica de guardado si tienes el método en tu servicio
    // this.userService.updateUser(this.selectedId, this.form.value).subscribe(...)
  }

  onCancel(): void {
    this.router.navigate([this.routes.Users]);
  }

  private async getUsersById(): Promise<void> {
    this.loading = true;
    try {
      const res = await this.userService.getUserById(this.selectedId);
      if (res) {
        this.selectedUsers = res;
        this.form.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          phoneNumber: res.phoneNumber,
          email: res.email,
          role: res.role,
          disabled: res.disabled,
          avatar: res.avatar,
          store: res.store || '',
          roleId: res.roleId,
        });
      } else {
        this.toastr.warning('Usuario no encontrado');
      }
    } catch (error) {
      this.toastr.error('Error al cargar el usuario');
    } finally {
      this.loading = false;
    }
  }
}
