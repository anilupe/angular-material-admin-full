import { Injectable } from '@angular/core';
import { db } from 'src/app/firebase-config';
import { Tiempo } from '../models/tiempo';
import { ref, get, child, push, update, remove, set } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class TiempoService {
  private TiempoesRef = ref(db, 'tiempo');

  async getAll(): Promise<Tiempo[]> {
    const snapshot = await get(this.TiempoesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  async getById(id: string): Promise<Tiempo | null> {
    const snapshot = await get(child(this.TiempoesRef, id));
    return snapshot.exists() ? { id, ...snapshot.val() } : null;
  }

  async create(Tiempo: Tiempo): Promise<void> {
    const newRef = push(this.TiempoesRef);
    await set(newRef, Tiempo);
  }

  async update(id: string, Tiempo: Tiempo): Promise<void> {
    await update(child(this.TiempoesRef, id), Tiempo);
  }

  async delete(id: string): Promise<void> {
    await remove(child(this.TiempoesRef, id));
  }
}
