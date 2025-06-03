import { Injectable } from '@angular/core';
import { db } from '../../firebase-config';
import {
  ref,
  set,
  push,
  update,
  remove,
  get,
  child,
} from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  private tiendasRef = ref(db, 'tiendas');

  constructor() {}

  // Crear tienda
  async crearTienda(tienda: any) {
    const nuevaTiendaRef = push(this.tiendasRef);
    console.log('Referencia de la nueva tienda:', nuevaTiendaRef);
    await set(nuevaTiendaRef, tienda);
    console.log('Tienda creada con ID:', nuevaTiendaRef.key);
    return nuevaTiendaRef.key;
  }

  async obtenerTiendas(): Promise<any[]> {
    const snapshot = await get(this.tiendasRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log('Datos de tiendas obtenidos:', data);
      return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    } else {
      return [];
    }
  }

  // Leer una tienda por ID
  async obtenerTienda(id: string): Promise<any> {
    const snapshot = await get(child(this.tiendasRef, id));
    return snapshot.exists() ? snapshot.val() : null;
  }

  // Actualizar tienda
  async actualizarTienda(id: string, tienda: any) {
    const tiendaRef = child(this.tiendasRef, id);
    return update(tiendaRef, tienda);
  }

  // Eliminar tienda
  async eliminarTienda(id: string) {
    const tiendaRef = child(this.tiendasRef, id);
    return remove(tiendaRef);
  }

  async crearSubtienda(tiendaId: string, subtienda: any): Promise<string> {
    const subtiendasRef = ref(db, `tiendas/${tiendaId}/subtiendas`);
    const nuevaSubtiendaRef = push(subtiendasRef);
    await set(nuevaSubtiendaRef, subtienda);
    return nuevaSubtiendaRef.key!;
  }

  async obtenerSubtiendas(tiendaId: string): Promise<any[]> {
    const subtiendasRef = ref(db, `tiendas/${tiendaId}/subtiendas`);
    const snapshot = await get(subtiendasRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(`Subtiendas de tienda ${tiendaId} obtenidas:`, data);
      return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    } else {
      return [];
    }
  }
}
