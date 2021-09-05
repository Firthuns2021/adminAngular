import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map  } from 'rxjs/operators';

@Injectable()
export class IntInterceptor implements HttpInterceptor {
  token: any = '';

  constructor(private http: HttpClient) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {



      // console.log('request', request);
    // no se agrega token a las peticiones de login ni de refrescar el token
      if ( request.url === environment.urlLogin || request.url === environment.urlRefreshToken){
      return next.handle(request);
    }


       // se obtiene el token del local storage
      this.token =  localStorage.getItem('token');

      // // capturamos fecha de  expiracion en formato epoch
      const payload: any = JSON.parse( atob( this.token.split('.')[1] ) ).exp ;
      //
      // // Cambiamos el formato epoch por el formato tradicional de fecha
      const tokenExp: any = new Date(payload * 1000);
      // console.log('tokenExp', tokenExp);
      // // Capturamos el tiempo actual
      const now: any = new Date();
      //
      // // calculamos 15 minutos después del tiempo actual
      now.setTime(now.getTime() + (15 * 60 * 1000));
      // console.log('now', now);

      // // Validamos si el token está próximo a vencerse
      if ( tokenExp.getTime() < now.getTime()){

        const body = {
          'grant_type': 'refresh_token',
          'refresh_token': localStorage.getItem('refreshToken')
        };
        this.http.post( environment.urlRefreshToken, body).subscribe(
          (resp: any) => {
            localStorage.setItem('token', resp.id_token);
            localStorage.setItem('refreshToken', resp.refresh_token);
            this.token = resp.id_token;
          }
        );

      }
// una vez creado nuestra función cloneToken() -> volvemos a esta y con la función pipe -> map hacemos lo iguiente
    // el interceptor se encargará de agregar el token a nuestra peticion a la base de datos.
      return next.handle( this.cloneToken(request, this.token)).pipe(
        map( (resp: any) => {
          // console.log('respuesta pipe.map', resp);
          return resp;
        })
      );


  }

  /* *****************************************************************************************
  Clonar el páramentro token , asi nos evitamos estar constantemente solicitando el
  token y enviandolo al servicio para realizar cualquier futura petición.
   ***************************************************************************************** */

   cloneToken(request: HttpRequest<unknown>, token: string): HttpRequest<any> {


     return request.clone({
       setParams: {
         auth: token
       }
     });
  }
}
