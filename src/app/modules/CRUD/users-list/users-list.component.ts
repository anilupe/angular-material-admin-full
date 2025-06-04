import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';
//import { UsersService } from '../../../shared/services/users.service';
import { routes } from '../../../consts';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../../../shared/popups/delete-popup/delete-popup.component';
import { Users } from '../../../shared/models/users.model';
import { MatPaginator } from '@angular/material/paginator';
import { FilterConfig, FilterItems } from '../../../shared/models/common';
import { UserService } from '../../user/service';
import { AuthServicesFirebase } from '../../auth/services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  users: Users[];
  loading = false;
  selectedId: string;
  deleteConfirmSubscription;
  public routes: typeof routes = routes;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'store',
    'role',
    'disabled',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  showFilters = false;
  filters: any[] = [];
  config: any = {};

  constructor(
    private userService: AuthServicesFirebase,
    private router: Router,
  ) {}

  async ngOnInit() {
    const users = await this.userService.getUsers();
    this.dataSource.data = users;
  }

  edit(id: string) {
    this.router.navigate(['users/edit/', id]);
  }

  openDeleteModal(userId: string) {
    console.log('Eliminar usuario', userId);
  }

  addFilter() {
    this.showFilters = true;
  }

  clearFilters() {
    this.filters = [];
  }

  delFilter() {}

  submitHandler(filters: any[]) {
    // aplicar los filtros recibidos
  }

  sort(event: any) {
    const sortKey = event.active;
    const direction = event.direction;

    const sortedData = [...this.dataSource.data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    this.dataSource.data = sortedData;
  }

  setLimit(event: any) {
    // puedes manejar paginación manual aquí si necesitas
  }

  redirectToSwagger() {
    return 'https://tudocumentacion-api.com/users'; // Ajusta URL real
  }
}
