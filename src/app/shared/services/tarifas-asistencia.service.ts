import { Injectable } from '@angular/core';
import { TarifasAsistencia } from '../models/tarifas-asistencia';
import { child, get, push, ref, remove, set, update } from 'firebase/database';
import { db } from 'src/app/firebase-config';

@Injectable({
  providedIn: 'root',
})
export class TarifasAsistenciaService {
  private TarifasAsistenciaesRef = ref(db, 'tarifasAsistencias');

  async getAll(): Promise<TarifasAsistencia[]> {
    const snapshot = await get(this.TarifasAsistenciaesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  async getById(id: string): Promise<TarifasAsistencia | null> {
    const snapshot = await get(child(this.TarifasAsistenciaesRef, id));
    return snapshot.exists() ? { id, ...snapshot.val() } : null;
  }

  async create(TarifasAsistencia: TarifasAsistencia): Promise<void> {
    const newRef = push(this.TarifasAsistenciaesRef);
    await set(newRef, TarifasAsistencia);
  }

  async update(
    id: string,
    TarifasAsistencia: TarifasAsistencia,
  ): Promise<void> {
    await update(child(this.TarifasAsistenciaesRef, id), TarifasAsistencia);
  }

  async delete(id: string): Promise<void> {
    await remove(child(this.TarifasAsistenciaesRef, id));
  }
}
