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
import { Interest } from '../models/interest';
@Injectable({
  providedIn: 'root'
})
export class InteresService {
   
  private interesesRef = ref(db, 'ctg_intereses');

  async getAll(): Promise<Interest[]> {
    const snapshot = await get(this.interesesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  async getById(id: string): Promise<Interest | null> {
    const snapshot = await get(child(this.interesesRef, id));
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    }
    return null;
  }

  async create(interest: Interest): Promise<void> {
    const newRef = push(this.interesesRef);
    await set(newRef, interest);
  }

  async update(id: string, interest: Interest): Promise<void> {
    const interestRef = child(this.interesesRef, id);
    await update(interestRef, interest);
  }

  async delete(id: string): Promise<void> {
    const interestRef = child(this.interesesRef, id);
    await remove(interestRef);
  }
}