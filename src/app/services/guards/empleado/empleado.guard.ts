import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../auth/auth.service";
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.afAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {

        this.auth.afAuth.authState.subscribe(
          auth => {
            if (auth) {
              this.auth.getUserRole(auth.uid).subscribe(
                userRole => {
                  if (Object.assign({}, userRole).hasOwnProperty('rol')) {
                    if (userRole.rol != 'empleado' && userRole.rol != 'admin') {
                      console.warn('Acceso denegado');
                      this.router.navigate(['/home']);
                    }
                  }
                }
              )
            } else {
              //console.log('Debes iniciar sesión');
              //this.router.navigate(['/login']);
            }
          }
        )

      }));

  }

}
