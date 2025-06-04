// src/app/core/services/phone.service.ts
import { Injectable } from '@angular/core';
import { db } from '../../firebase-config';
import {
  ref,
  push,
  set,
  update,
  remove,
  get,
  child,
} from 'firebase/database';
import { Phone } from '../models/phone';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private phonesRef = ref(db, 'phones');

  async getAll(): Promise<Phone[]> {
    const snapshot = await get(this.phonesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({
        id,
        ...value,
      }));
    }
    return [];
  }

  async getById(id: string): Promise<Phone | null> {
    const snapshot = await get(child(this.phonesRef, id));
    return snapshot.exists() ? { id, ...snapshot.val() } : null;
  }

  async create(phone: Phone): Promise<void> {
    const newRef = push(this.phonesRef);
    await set(newRef, phone);
  }

  async update(id: string, phone: Phone): Promise<void> {
    await update(child(this.phonesRef, id), phone);
  }

  async delete(id: string): Promise<void> {
    await remove(child(this.phonesRef, id));
  }
}
