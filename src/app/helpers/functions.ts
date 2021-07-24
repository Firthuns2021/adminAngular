// funciones reutilizables que podemos utilizar en cualquier momento.

import {FormGroup} from '@angular/forms';

// tslint:disable-next-line:class-name
export class functions{

  static invalidField(field: string, f: FormGroup, formSubmitted: boolean): boolean{


      if (formSubmitted && f.controls[field].invalid){
        console.log(field);
        return true;
      }else {
        return false;
      }

  }

}
