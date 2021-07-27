import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonToString'
})
export class JsonToStringPipe implements PipeTransform {

  transform(value: any, ...args: any): any {

    if ( value){
      const arr = JSON.parse(value);
      let str = '';

      // tslint:disable-next-line:forin
      for (const i in arr) {
         str += arr[i] + ', ';
      }

      str = str.slice(0, -2); // me quita al final la coma con su espacio (linea16)
      return str;
    }



    return null;
  }

}
