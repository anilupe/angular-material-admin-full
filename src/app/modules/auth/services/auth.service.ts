import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';

import { auth, db } from '../../../firebase-config';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesFirebase {
  user$!: any;

  UserData: any;
  constructor(private router: Router, public ngZone: NgZone) {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        this.UserData = user;
        this.user$ = new Observable<User | null>((subscriber) => {
          onAuthStateChanged(auth, subscriber);
        });
        localStorage.setItem('user', JSON.stringify(this.UserData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  //get User
  //get Authenticated user from firebase
  async getAuthFire(): Promise<User | null> {
    const user = await new Promise<User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        console.log('getAuthFire called', user);
        resolve(user);
      });
    });
    return user;
  }

  //get Authenticated user from Local Storage
  getAuthLocal() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user;
  }

  //Check wither User Is looged in or not
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }

  async register(user: {
    nombre: string;
    correo: string;
    telefono: string;
    phoneNumber: string;
    tiendaId: string;
    rolId: string;
    activo: boolean;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
    avatar?: string[];
    password: string;
  }): Promise<string | void> {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        user.correo,
        user.password,
      );
      const uid = result.user.uid;
      this.UserData = result.user;
      const userRef = ref(db, `usuarios/${uid}`);

      await set(userRef, {
        nombre: user.nombre,
        correo: user.correo,
        telefono: user.telefono,
        phoneNumber: user.phoneNumber,
        tiendaId: user.tiendaId,
        rolId: user.rolId,
        activo: user.activo,
        authUid: uid,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
      });

      this.ngZone.run(() => {
        sendEmailVerification(result.user);
        this.router.navigate(['/usuarios']);
      });

      return uid;
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      window.alert(error.message);
    }
  }
  //Login Method
  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((result: any) => {
        return result.user;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  //Logout
  Logout() {
    signOut(auth).then(() => this.router.navigate(['/login']));
  }

  GoogleAuth() {
    return this.loginWithPopup(new GoogleAuthProvider());
  }

  loginWithPopup(provider: any) {
    return signInWithPopup(auth, provider).then(() => {
      this.router.navigate(['dashboard']);
    });
  }

  async sendPasswordResetEmails(email: string) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  //Send Email Verification
  sendEmailVerification() {
    return sendEmailVerification(auth.currentUser as User);
  }

  isAuthenticated(): Observable<boolean> {
    if (!this.user$) {
      // Si this.user$ no está definido, devolver un observable de false
      return new Observable<boolean>((observer) => {
        observer.next(false);
        observer.complete();
      });
    }

    return this.user$.pipe(map((user) => !!user));
  }

  async getUsers(): Promise<any[]> {
    const dbRef = ref(db);

    try {
      const [usersSnapshot, rolesSnapshot,tiendasSnapshot] = await Promise.all([
        get(child(dbRef, 'usuarios')),
        get(child(dbRef, 'roles')),
        get(child(dbRef, 'tiendas')),

      ]);

      const rolesMap = rolesSnapshot.exists() ? rolesSnapshot.val() : {};
      const tiendasMap = tiendasSnapshot.exists() ? tiendasSnapshot.val() : {};

      if (usersSnapshot.exists()) {
        const data = usersSnapshot.val();
        return Object.entries(data)
          .filter(
            ([_, value]: [string, any]) =>
              value &&
              typeof value === 'object' &&
              'nombre' in value &&
              'correo' in value &&
              'rolId' in value,
          )
          .map(([key, value]: [string, any]) => ({
            id: key,
            ...value,
            firstName: value.nombre?.split(' ')[0] || '',
            lastName: value.nombre?.split(' ')[2] || '',
            phoneNumber: value.phoneNumber,
            email: value.correo,
            role: rolesMap[value.rolId]?.nombre || value.rolId,
            store: tiendasMap[value.tiendaId]?.nombre || value.tiendaId,
            disabled: !value.activo,
            avatar: [],
          }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error al obtener usuarios o roles:', error);
      return [];
    }
  }

  async getUserById(userId: string): Promise<any | null> {
    const dbRef = ref(db);
  
    try {
      // Obtenemos el usuario
      const userSnapshot = await get(child(dbRef, `usuarios/${userId}`));
  
      if (!userSnapshot.exists()) {
        return null;
      }
  
      const userData = userSnapshot.val();
  
      // Obtenemos los roles y tiendas
      const [rolesSnapshot, tiendasSnapshot] = await Promise.all([
        get(child(dbRef, 'roles')),
        get(child(dbRef, 'tiendas')),
      ]);
  
      const rolesMap = rolesSnapshot.exists() ? rolesSnapshot.val() : {};
      const tiendasMap = tiendasSnapshot.exists() ? tiendasSnapshot.val() : {};
  
      return {
        id: userId,
        ...userData,
        firstName: userData.nombre?.split(' ')[0] || '',
        lastName: userData.nombre?.split(' ')[1] || '',
        phoneNumber: userData.phoneNumber,
        email: userData.correo,
        role: rolesMap[userData.rolId]?.nombre || userData.rolId, // Nombre del rol
        store: tiendasMap[userData.tiendaId]?.nombre || userData.tiendaId, // Nombre de la tienda
        disabled: !userData.activo,
        avatar: [],
      };
    } catch (error) {
      console.error(`Error al obtener el usuario con ID ${userId}:`, error);
      return null;
    }
  }
  
}
