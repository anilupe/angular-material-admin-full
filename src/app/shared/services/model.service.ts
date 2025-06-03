import { Injectable } from '@angular/core';
import { db } from '../../firebase-config';
import { ref, push, set, update, remove, get, child } from 'firebase/database';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private modelsRef = ref(db, 'modelos');

  async getAll(): Promise<Model[]> {
    const snapshot = await get(this.modelsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  async getById(id: string): Promise<Model | null> {
    const snapshot = await get(child(this.modelsRef, id));
    return snapshot.exists() ? { id, ...snapshot.val() } : null;
  }

  async create(model: Model): Promise<void> {
    const newRef = push(this.modelsRef);
    await set(newRef, model);
  }

  async update(id: string, model: Model): Promise<void> {
    await update(child(this.modelsRef, id), model);
  }

  async delete(id: string): Promise<void> {
    await remove(child(this.modelsRef, id));
  }
}
