import { Component, OnInit } from '@angular/core';
import {FormBuilder,  Validators} from '@angular/forms';
import {functions} from '../../helpers/functions';
import {alerts} from '../../helpers/alerts';
import {Ilogin} from '../../interface/ilogin';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**  Creamos grupo de controles   */
  public f = this.fb.group({
    email: ['firthunsmarketplace@gmail.com', [ Validators.required, Validators.email]],
    password: ['123456',  [ Validators.required]]
  });

  formSubmitted = false;


  constructor(private fb: FormBuilder,
              private loginServices: LoginService,
              private router: Router) { }

  ngOnInit(): void {  }



  login(): void {

    /**   Validamos que el formulario haya sido enviado */
    this.formSubmitted = true;
    /** Validamos que el formulario esté correcto */
    if ( this.f.invalid){
      // si el status viene invalid, no saca de la funcion
      return;
    }
    /** Capturamos la información del formulario en la interfaz
     */
    const data: Ilogin = {
      email:  this.f.controls.email.value,
      password: this.f.controls.password.value,
      returnSecureToken: true
    };
    /** La respuesta viene en forma de promesa que la debo de obterner mediante subscribe...
     */

    this.loginServices.login(data).subscribe( (resp: any) => {
        console.log(resp);
        this.router.navigateByUrl('/');
      // alerts.basicAlert('Bienvenido', 'Todo correcto', 'success');

      }, (err: any) => {

 /** Cuando hay erroes, diferencias los diferentes tipos que se pueden generar */
      if ( err.error.error.message === 'EMAIL_NOT_FOUND'){
        alerts.basicAlert('Error', 'Invalid email', 'error');
      } else if ( err.error.error.message === 'INVALID_PASSWORD'){
        alerts.basicAlert('Error', 'Invalid password', 'error');
      } else{
        alerts.basicAlert('Error', 'An error occurred', 'error');
      }


      }

    );

  }
    /** Validamos el formulario */
  invalidField(field: string): any {
    return functions.invalidField(field, this.f, this.formSubmitted);
  }


}
