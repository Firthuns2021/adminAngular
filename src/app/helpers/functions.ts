// funciones reutilizables que podemos utilizar en cualquier momento.

import {FormGroup} from '@angular/forms';

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

}
