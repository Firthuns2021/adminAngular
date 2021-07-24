import { Injectable } from '@angular/core';
import {Ilogin} from '../interface/ilogin';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login( data: Ilogin): any{
    // return 'Retornamos la data:' + JSON.stringify(data);

    return this.http.post(environment.urlLogin, data);
  }
}
