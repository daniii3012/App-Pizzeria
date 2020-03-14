import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  user: User;
  userRole: string;

  constructor(
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {

    this.afAuth.authState.subscribe(
      data => {
        this.authState = data
      }
      
    );

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })

  }

  register(
    email: string, 
    password: string,
    alias: string,
    userID: string, 
    nombre: string,
    apellido: string,
    telefono: string,
    rol: string,
    //photoURL: string,
    ) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.updateProfile({
          displayName: alias
        })
        this.addUserDb(res.user, userID, nombre, apellido, telefono, rol);
      }).catch(err => console.log(err.message));
  }

  addUserDb(
    user,
    userID,
    nombre,
    apellido,
    telefono,
    rol
    ){
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`usuario/${user.uid}`);
    this.afStore.doc<any>(`usuario/${user.uid}`).valueChanges().subscribe( // llama a la base de datos usuario
      db => {
        const data: any = {
          id: user.uid,
          email: user.email,
          alias: user.displayName,
          userID: userID,
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          rol: rol
        }
        return userRef.set(data, { merge: true })
      }
    );
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
      }).catch(err => console.log(err.message));
  }

  logout() {
    this.afAuth.auth.signOut().then(
    ).catch(err => console.log(err.message));
    localStorage.removeItem('user');
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserID(): string {
    return this.authenticated ? this.authState.uid : null
  }

}

