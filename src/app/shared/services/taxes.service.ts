import { Injectable } from '@angular/core';
import { db } from '../../firebase-config';
import { ref, push, set, update, remove, get, child } from 'firebase/database';
import { Tax } from '../models/tax';

@Injectable({
  providedIn: 'root',
})
export class TaxesService {
  private taxesRef = ref(db, 'taxes');

  async getAll(): Promise<Tax[]> {
    const snapshot = await get(this.taxesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  async getById(id: string): Promise<Tax | null> {
    const snapshot = await get(child(this.taxesRef, id));
    return snapshot.exists() ? { id, ...snapshot.val() } : null;
  }

  async create(tax: Tax): Promise<void> {
    const newRef = push(this.taxesRef);
    await set(newRef, tax);
  }

  async update(id: string, tax: Tax): Promise<void> {
    await update(child(this.taxesRef, id), tax);
  }

  async delete(id: string): Promise<void> {
    await remove(child(this.taxesRef, id));
  }
}
