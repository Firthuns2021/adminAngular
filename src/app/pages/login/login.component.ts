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
    this.formSubmitted = true;

    if ( this.f.invalid){
      // si el status viene invalid, no saca de la funcion
      return;
    }

    const data: Ilogin = {
      email:  this.f.controls.email.value,
      password: this.f.controls.password.value,
      returnSecureToken: true
    };
    // la respuesta viene en forma de promesa que la debo de obterner mediante subscribe...
    this.loginServices.login(data).subscribe( (resp: any) => {

        this.router.navigateByUrl('/');
      // alerts.basicAlert('Bienvenido', 'Todo correcto', 'success');

      }, (err: any) => {


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

  invalidField(field: string): any {
    return functions.invalidField(field, this.f, this.formSubmitted);
  }


}
