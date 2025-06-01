import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Users } from '../../../models/users.model';
import { routes } from '../../../../consts';
import { AuthService } from '../../../services/auth.service';
import { AuthServicesFirebase } from 'src/app/modules/auth/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
 // public user$: Observable<Users>;
 public user:any;
  public routers: typeof routes = routes;

  constructor(private authService: AuthServicesFirebase, private router: Router) {
   
  }

  async ngOnInit() {
    this.user = await this.authService.getAuthFire();
    console.log(this.user, 'user from header component');
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
   // this.authService.logoutUser();

    this.router.navigate([this.routers.LOGIN]);
  }
}
