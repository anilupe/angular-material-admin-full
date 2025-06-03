import { Injectable } from '@angular/core';
import { db } from '../../firebase-config';
import { ref, push, set, update, remove, get, child } from 'firebase/database';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private rolesRef = ref(db, 'roles');

  async getAll(): Promise<Rol[]> {
    const snapshot = await get(this.rolesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  async getById(id: string): Promise<Rol | null> {
    const snapshot = await get(child(this.rolesRef, id));
    return snapshot.exists() ? { id, ...snapshot.val() } : null;
  }

  async create(rol: Rol): Promise<void> {
    const newRef = push(this.rolesRef);
    await set(newRef, rol);
  }

  async update(id: string, rol: Rol): Promise<void> {
    await update(child(this.rolesRef, id), rol);
  }

  async delete(id: string): Promise<void> {
    await remove(child(this.rolesRef, id));
  }
}
