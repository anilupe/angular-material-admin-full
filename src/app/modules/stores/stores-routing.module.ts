import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresListComponent } from './stores-list/stores-list.component';
import { StoresEditComponent } from './stores-edit/stores-edit.component';
import { StoresCreateComponent } from './stores-create/stores-create.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresRoutingModule {}
