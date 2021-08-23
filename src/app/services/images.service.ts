import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor( private  http: HttpClient ) { }

  /*=============================================
Función para subir imagen al servidor
=============================================*/

  uploadImage( file: any, path: string, folder: string, width: number, height: number, name: any): any{

    const formData = new FormData();
    /* En nmuestro archivo index.php hemos definido las siguientes variables que definiran nuestra imagen*/
    formData.append('file', file.target.files[0]);
    formData.append('path', path);
    formData.append('folder', folder);
    formData.append('width', width.toString());
    formData.append('height', height.toString());

    if(name != null){

      formData.append('name', name);
    }

    return this.http.post(environment.adminFiles, formData);

  }

  /*=============================================
  Función para eliminar imagenes del servidor
  =============================================*/

  deleteImage(image: string): any {

    const formData = new FormData();
    formData.append('fileDelete', image);

    return this.http.post(environment.deleteFiles, formData);

  }

}
