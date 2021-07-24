
import Swal, { SweetAlertIcon} from 'sweetalert2';


// tslint:disable-next-line:class-name
export class alerts{

  // tslint:disable-next-line:typedef
  static basicAlert(tittle: string, text: string, icon: SweetAlertIcon){
    Swal.fire( tittle, text, icon);
  }


}
