import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresListComponent } from './stores-list/stores-list.component';
import { StoresEditComponent } from './stores-edit/stores-edit.component';
import { StoresCreateComponent } from './stores-create/stores-create.component';
import { SubstoresListComponent } from './substores/substores-list/substores-list.component';
import { SubstoresCreateComponent } from './substores/substores-create/substores-create.component';
import { InteresComponent } from './interes/interes.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloComponent } from './modelo/modelo.component';
import { TaxesComponent } from './taxes/taxes.component';
import { PhoneComponent } from './phone/phone.component';
import { RolesComponent } from './roles/roles.component';
import { TarifasAsistenciaComponent } from './tarifas-asistencia/tarifas-asistencia.component';
import { TiempoComponent } from './tiempo/tiempo.component';
import { EntradaComponent } from './entrada/entrada.component';

const routes: Routes = [
  {
    path: 'stores',
    component: StoresListComponent,
  },
  {
    path: 'stores/edit/:id',
    component: StoresEditComponent,
  },
  {
    path: 'stores/new',
    component: StoresCreateComponent,
  },
  {
    path: 'subtiendas/:id',
    component: SubstoresListComponent,
  },
  {
    path: 'subtiendas/editar/:id',
    component: StoresEditComponent,
  },
  {
    path: 'subtiendas/nueva/:id',
    component: SubstoresCreateComponent,
  },
  {
    path: 'interes',
    component: InteresComponent,
  },
  {
    path: 'marca',
    component: MarcaComponent,
  },
  {
    path: 'modelo',
    component: ModeloComponent,
  },
  {
    path: 'impuestos',
    component: TaxesComponent,
  },
  {
    path: 'teléfonos',
    component: PhoneComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'tarifas',
    component: TarifasAsistenciaComponent,
  },
  {
    path: 'tiempo',
    component: TiempoComponent,
  },
  {
    path: 'entrada',
    component: EntradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresRoutingModule {}
