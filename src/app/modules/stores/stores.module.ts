import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { StoresRoutingModule } from './stores-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { StoresCreateComponent } from './stores-create/stores-create.component';
import { StoresEditComponent } from './stores-edit/stores-edit.component';
import { StoresListComponent } from './stores-list/stores-list.component';
import { SubstoresCreateComponent } from './substores/substores-create/substores-create.component';
import { SubstoresListComponent } from './substores/substores-list/substores-list.component';
import { InteresComponent } from './interes/interes.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloComponent } from './modelo/modelo.component';
import { PhoneComponent } from './phone/phone.component';
import { TaxesComponent } from './taxes/taxes.component';
import { InteresModalComponent } from './dialog/interes-modal/interes-modal.component';
import { MarcaModalComponent } from './dialog/marca-modal/marca-modal.component';
import { ModeloModalComponent } from './dialog/modelo-modal/modelo-modal.component';
import { TaxesModalComponent } from './dialog/taxes-modal/taxes-modal.component';
import { PhoneModalComponent } from './dialog/phone-modal/phone-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RolesModalComponent } from './dialog/roles-modal/roles-modal.component';
import { RolesComponent } from './roles/roles.component';
import { UsersModalComponent } from './dialog/users-modal/users-modal.component';
import { TiempoModalComponent } from './dialog/tiempo-modal/tiempo-modal.component';
import { TiempoComponent } from './tiempo/tiempo.component';
import { EntradaComponent } from './entrada/entrada.component';
import { TarifasAsistenciaComponent } from './tarifas-asistencia/tarifas-asistencia.component';
import { ValorEntradaModalComponent } from './dialog/valor-entrada-modal/valor-entrada-modal.component';
import { TarifasAsistenciaModalComponent } from './dialog/tarifas-asistencia-modal/tarifas-asistencia-modal.component';

@NgModule({
  declarations: [
    StoresCreateComponent,
    StoresEditComponent,
    StoresListComponent,
    SubstoresCreateComponent,
    SubstoresListComponent,
    InteresComponent,
    MarcaComponent,
    ModeloComponent,
    PhoneComponent,
    TaxesComponent,
    InteresModalComponent,
    MarcaModalComponent,
    ModeloModalComponent,
    TaxesModalComponent,
    PhoneModalComponent,
    RolesModalComponent,
    RolesComponent,
    UsersModalComponent,
    TiempoModalComponent,
    TiempoComponent,
    EntradaComponent,
    TarifasAsistenciaComponent,
    ValorEntradaModalComponent,
    TarifasAsistenciaModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoresRoutingModule,
    NgSelectModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDialogModule,
  ],
})
export class StoresModule {}
