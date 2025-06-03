import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Auth,
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
import { getDatabase, set } from 'firebase/database';

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
    password: string;
  }): Promise<string | void> {
    try {
      const result = await createUserWithEmailAndPassword(auth, user.correo, user.password);
      this.UserData = result.user;

      const uid = result.user.uid;

      // ✅ Asegúrate que esta línea esté ANTES de usar `ref`
      const db = getDatabase();

      // ✅ `ref()` debe ir después de `getDatabase()`
      const userRef = ref(db, `usuarios/${uid}`);

      // ✅ set() espera un DatabaseReference, no un void
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
}
function ref(db: any, arg1: string) {
  throw new Error('Function not implemented.');
}
