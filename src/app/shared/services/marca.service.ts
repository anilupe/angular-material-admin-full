import { Injectable } from '@angular/core';
import { db } from '../../firebase-config';
import { ref, push, set, update, remove, get, child } from 'firebase/database';
import { Brand } from '../models/brand';
@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private brandsRef = ref(db, 'marcas');

  async getAll(): Promise<Brand[]> {
    const snapshot = await get(this.brandsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  async getById(id: string): Promise<Brand | null> {
    const snapshot = await get(child(this.brandsRef, id));
    return snapshot.exists() ? { id, ...snapshot.val() } : null;
  }

  async create(brand: Brand): Promise<void> {
    const newRef = push(this.brandsRef);
    await set(newRef, brand);
  }

  async update(id: string, brand: Brand): Promise<void> {
    await update(child(this.brandsRef, id), brand);
  }

  async delete(id: string): Promise<void> {
    await remove(child(this.brandsRef, id));
  }
}
