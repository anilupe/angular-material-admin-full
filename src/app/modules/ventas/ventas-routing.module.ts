import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearVentaComponent } from './crear-venta/crear-venta.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';


const routes: Routes = [
  {
    path: 'ventas',
    component: ListaVentasComponent,
  },
  {
    path: 'ventas/nueva',
    component: CrearVentaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
