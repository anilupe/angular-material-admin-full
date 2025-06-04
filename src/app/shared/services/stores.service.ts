import { Injectable } from '@angular/core';
import { db } from '../../firebase-config';
import { ref, set, push, update, remove, get, child } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  private tiendasRef = ref(db, 'tiendas');

  constructor() {}

  async crearTienda(tienda: any) {
    const nuevaTiendaRef = push(this.tiendasRef);
    await set(nuevaTiendaRef, tienda);
    return nuevaTiendaRef.key;
  }

  async obtenerTiendas(): Promise<any[]> {
    const snapshot = await get(this.tiendasRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    } else {
      return [];
    }
  }

  async obtenerTienda(id: string): Promise<any> {
    const snapshot = await get(child(this.tiendasRef, id));
    return snapshot.exists() ? snapshot.val() : null;
  }

  async actualizarTienda(id: string, tienda: any) {
    const tiendaRef = child(this.tiendasRef, id);
    return update(tiendaRef, tienda);
  }

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

  async eliminarSubTienda(tiendaId: string) {
    const subtiendasRef = ref(db, `tiendas/${tiendaId}/subtiendas`);
    return remove(subtiendasRef);
  }

  async obtenerSubtiendas(tiendaId: string): Promise<any[]> {
    const subtiendasRef = ref(db, `tiendas/${tiendaId}/subtiendas`);
    const snapshot = await get(subtiendasRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    } else {
      return [];
    }
  }
  updateSubtienda(tiendaId: string, subtiendaId: string, subtienda: any) {
    const subtiendaRef = child(
      ref(db, `tiendas/${tiendaId}/subtiendas`),
      subtiendaId,
    );
    return update(subtiendaRef, subtienda);
  }
}
