
import Swal, { SweetAlertIcon} from 'sweetalert2';


// tslint:disable-next-line:class-name
export class alerts{

    /** Funcion para alerta básica */
  static basicAlert(tittle: string, text: string, icon: SweetAlertIcon): void{
    Swal.fire( tittle, text, icon);
  }


}
