
import Swal, { SweetAlertIcon} from 'sweetalert2';


// tslint:disable-next-line:class-name
export class alerts{

    /** Funcion para alerta básica */
  static basicAlert(tittle: string, text: string, icon: SweetAlertIcon): void{
    Swal.fire( tittle, text, icon);
  }

  /*=============================================
    Función para alertas con confirmación
    =============================================*/

  static confirmAlert(title: string, text: string, icon: SweetAlertIcon, confirmButtonText: string): any{

    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText
    });

  }

}
