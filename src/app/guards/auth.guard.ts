import { Injectable } from '@angular/core';
import {  CanActivate,  Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private http: HttpClient ) { }

  canActivate(): Promise<boolean>  {
    // console.log('route', route);
    // console.log('state', state);
    // vamos a comprobar que el token se encuentra grabado
    return new Promise( resolve => {
      // Validaos que el token si exista
      if ( sessionStorage.getItem('token') !== null ){
        // validamos que el token si sea real
        const body = {
          idToken: sessionStorage.getItem('token')
        };

        this.http.post( environment.urlGetuser, body  ).subscribe(
          resp => {
              console.log(resp);
          },
          error => {
            this.logout();
            resolve(false);
          }


        );

        resolve(true);
      }else{
        this.logout();
        // sessionStorage.removeItem('token');
        // sessionStorage.removeItem('refreshToken');
        // this.router.navigateByUrl('/login');
        resolve(false);
      }

    });
  }

  private logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    this.router.navigateByUrl('/login');
  }
}
