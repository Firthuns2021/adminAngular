import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }

  /* Tomar la data de la colección de usuario en Firebase */
  getData(): any {
    return this.http.get(`${environment.urlFirebase}users.json`);
  }
}
