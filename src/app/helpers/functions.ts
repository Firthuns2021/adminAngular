// funciones reutilizables que podemos utilizar en cualquier momento.

import {FormGroup} from '@angular/forms';
import {alerts} from './alerts';

// tslint:disable-next-line:class-name
export class functions{

  static invalidField(field: string, f: FormGroup, formSubmitted: boolean): boolean{

 /**  Función para validar campos del formulario */
      if (formSubmitted && f.controls[field].invalid){
        console.log(field);
        return true;
      }else {
        return false;
      }

  }


  /*=============================================
  Función para determinar tamaños de pantalla
  =============================================*/

  static screenSize(minWidth: number, maxWidth: number): boolean{

    if (window.matchMedia(`(min-width:${minWidth}px) and (max-width:${maxWidth}px)`).matches){

      return true;

    }else{

      return false;
    }

  }


  /*=============================================
Función para validar la imagen.
 Imagen se encuentra en codificación base 64
=============================================*/

  static validateImage(e: any): any{

    return new Promise(resolve => {

      const image = e.target.files[0];
/*=============================================
    Validamos el formato
=============================================*/
      if (image['type'] !== 'image/jpeg' && image['type'] !== 'image/png'){
      // if ( image.type !== 'image/jpeg' && image.type !== 'image/png'){
        alerts.basicAlert('error', 'The image must be in JPG or PNG format', 'error');
        return;
      }
      /*=============================================
      Validamos el tamaño
      =============================================*/
      else if (image.size > 2000000){

        alerts.basicAlert('error', 'Image must not weigh more than 2MB', 'error');

        return;

      }

      /*=============================================
      Mostramos la imagen temporal
      =============================================*/

      else{

        const data = new FileReader();
        data.readAsDataURL(image); // leer el archivo como una url

        data.onloadend = () => {

          resolve(data.result);

        };

      }


    });

  }

  /*=============================================
	Crear URL
	=============================================*/
  static createUrl(value: string): any{

    value = value.toLowerCase();
    value = value.replace(/[ ]/g, '-'); // me toma todos los espacios vacio y me lo convierta en espacio vacios
    value = value.replace(/[á]/g, 'a');
    value = value.replace(/[é]/g, 'e');
    value = value.replace(/[í]/g, 'i');
    value = value.replace(/[ó]/g, 'o');
    value = value.replace(/[ú]/g, 'u');
    value = value.replace(/[ñ]/g, 'n');
    value = value.replace(/[,]/g, '');

    return value;

  }

  /*=============================================
Función para dar formato a las fechas
	=============================================*/
  static formatDate(date: Date): any{

    return `${date.getFullYear()}-${('0' + date.getMonth() + 1).slice(-2)}-${('0' + date.getDate() + 1).slice(-2)}T00:00:00`;
  }

}



