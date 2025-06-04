import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearVentaComponent } from './crear-venta/crear-venta.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';



@NgModule({
  declarations: [
    CrearVentaComponent,
    ListaVentasComponent
  ],
  imports: [
    HeaderModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,
    MatTreeModule,
    MatBadgeModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    NgSelectModule,
    VentasRoutingModule
  ],
  exports: [

  ]
})
export class VentasModule { }
