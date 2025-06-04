import { Injectable } from '@angular/core';
import { ValorEntrada } from '../models/valor-entrada';
import { db } from 'src/app/firebase-config';
import { child, get, push, ref, remove, set, update } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ValorEntradaService {
  private taxesRef = ref(db, 'valor-entrada');

  async getAll(): Promise<ValorEntrada[]> {
    const snapshot = await get(this.taxesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  async getById(id: string): Promise<ValorEntrada | null> {
    const snapshot = await get(child(this.taxesRef, id));
    return snapshot.exists() ? { id, ...snapshot.val() } : null;
  }

  async create(tax: ValorEntrada): Promise<void> {
    const newRef = push(this.taxesRef);
    await set(newRef, tax);
  }

  async update(id: string, tax: ValorEntrada): Promise<void> {
    await update(child(this.taxesRef, id), tax);
  }

  async delete(id: string): Promise<void> {
    await remove(child(this.taxesRef, id));
  }
}
