import { Injectable } from '@angular/core';
import {Ilogin} from '../interface/ilogin';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  /** Vamos a mapear la respuesta con un operador rxjs. para guardarnos el idToken de firebase */
  login( data: Ilogin): any{
    // return 'Retornamos la data:' + JSON.stringify(data);
   return this.http.post(environment.urlLogin, data).pipe(
     map( (resp: any ) => {
        // console.log('map', resp);
       /** Captura token y refreshtoken y lo guardamos en la sessionStorage */
        sessionStorage.setItem('token', resp.idToken);
        sessionStorage.setItem('refreshToken', resp.refreshToken);
     })
   );
  }
}
