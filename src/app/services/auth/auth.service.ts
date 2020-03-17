import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import { CartService } from '../cart/cart.service';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private cartService: CartService
  ) {

    this.afAuth.authState.subscribe(
      data => {
        this.authState = data
      }
      
    );

    /* Guardado en local del usuario */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })

  }

  /* Registro del usuario */
  register(
    email: string, 
    password: string,
    displayName: string,
    userId: string, 
    nombres: string,
    apellidos: string,
    telefono: string,
    direccion: string
    ) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        /* Actualiza la propiedad displayName del usuario */
        res.user.updateProfile({
          displayName: displayName
        })
        this.addUserDb(res.user, userId, nombres, apellidos, displayName, telefono, direccion);
        this.cartService.addCart(res.user.uid);
      }).catch(err => console.log(err.message));
  }

  /* Añade los datos del usuario a la base de datos*/
  addUserDb(
    user,
    userId,
    nombres,
    apellidos,
    displayName,
    telefono,
    direccion
    ){
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`usuarios/${user.uid}`);
    this.afStore.doc<any>(`usuarios/${user.uid}`).valueChanges().subscribe( 
      db => {
        const data: any = {
          uid: user.uid,
          email: user.email,
          nombreUsuario: displayName,
          userId: userId,
          nombres: nombres,
          apellidos: apellidos,
          telefono: telefono,
          direccion: direccion,
          rol: 'cliente' // Define por defecto al registrarse un usuario su rol como cliente
        }
        return userRef.set(data, { merge: true })
      }
    );
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => this.loginRedirectTo()
      ).catch(err => console.log(err.message));
  }

  logout() {
    this.afAuth.auth.signOut().then(
      res => this.logoutRedirectTo()
    ).catch(err => console.log(err.message));
    localStorage.removeItem('user');
  }

  getUserById(id) {
    return this.afStore.doc<any>(`usuarios/${id}`).valueChanges();
  }

  loginRedirectTo(): void {
    this.router.navigate(['/home']);
  }

  logoutRedirectTo(): void {
    this.router.navigate(['/login']);
  }
  
}

