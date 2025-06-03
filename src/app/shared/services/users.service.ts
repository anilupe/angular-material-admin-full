import { Injectable } from '@angular/core';
import { db } from '../../firebase-config';
import { ref, push, set, update, remove, get, child } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
} from 'firebase/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersRef = ref(db, 'usuarios');
  private auth = getAuth();

  async getAll(): Promise<User[]> {
    const snapshot = await get(this.usersRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  async getById(id: string): Promise<User | null> {
    const snapshot = await get(child(this.usersRef, id));
    return snapshot.exists() ? { id, ...snapshot.val() } : null;
  }

  async create(user: User, password: string): Promise<void> {
    // Crear en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      user.correo,
      password,
    );

    const newRef = push(this.usersRef);
    const userToSave = {
      ...user,
      authUid: userCredential.user.uid,
    };

    await set(newRef, userToSave);
  }

  async update(id: string, user: User): Promise<void> {
    await update(child(this.usersRef, id), user);
  }

  async delete(id: string): Promise<void> {
    const usuario = await this.getById(id);
    if (usuario?.authUid) {
      // Opcional: Si tienes acceso, elimina del Auth también
      // (necesitarás un Cloud Function para eso en la mayoría de los casos)
    }
    await remove(child(this.usersRef, id));
  }
}
