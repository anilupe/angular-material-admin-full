import { Injectable,NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User,
  
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthServicesFirebase {
  user$!: any;

  UserData : any;
  constructor(private auth: Auth,private router : Router, public ngZone: NgZone){

    onAuthStateChanged(this.auth,(user: any)=>{
      if(user){
        this.UserData = user;
        this.user$ = new Observable<User | null>((subscriber) => {
          onAuthStateChanged(this.auth, subscriber);
        });
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
   }


  //get User
    //get Authenticated user from firebase
    getAuthFire(){
      return this.auth.currentUser;
    }

    //get Authenticated user from Local Storage
    getAuthLocal(){
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user;
    }

    //Check wither User Is looged in or not
    get isLoggedIn(): boolean {
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user !== null ? true : false;
    }

    //Register Method
    Register(email : string, password : string) {
      return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
           
          this.sendEmailVerification();
          alert('registri cinpleto')
          //this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }

    //Login Method
    login(email : string, password : string){
      return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }
    //Logout
    Logout() {
      signOut(this.auth).then(()=>this.router.navigate(['/login']))

    }

    GoogleAuth() {
      return this.loginWithPopup(new GoogleAuthProvider());
    }


    loginWithPopup(provider :any) {
      return signInWithPopup(this.auth,provider).then(() => {
        this.router.navigate(['dashboard']);
      });
    }

    async sendPasswordResetEmails(email : string){
       sendPasswordResetEmail(this.auth,email)
       .then(() => {
          window.alert('Password reset email sent, check your inbox.');
       })
       .catch((error) => {
        window.alert(error.message);
      });
    }
    //Send Email Verification
    sendEmailVerification(){
      return sendEmailVerification(this.auth.currentUser as User );
    }

    isAuthenticated(): Observable<boolean> {
      if (!this.user$) {
        // Si this.user$ no está definido, devolver un observable de false
        return new Observable<boolean>(observer => {
          observer.next(false);
          observer.complete();
        });
      }
  
      return this.user$.pipe(
        map(user => !!user)
      );
    }

    
}
