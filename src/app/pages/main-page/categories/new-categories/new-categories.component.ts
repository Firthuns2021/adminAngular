import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { functions } from 'src/app/helpers/functions';
import { CategoriesService } from 'src/app/services/categories.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-categories',
  templateUrl: './new-categories.component.html',
  styleUrls: ['./new-categories.component.css']
})

export class NewCategoriesComponent implements OnInit {


 /*=============================================
  Creamos grupo de controles
  =============================================*/

  public f = this.form.group({

    icon: ['', Validators.required],
    image: ['', Validators.required],
    // name: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúñÁÉÍÓÚÑ ]*')] ],
    name: ['',  {Validators: [ Validators.required,
                               Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚÑ ]*')  ],
                               asyncValidators: [ this.isRepeatCategory() ],
                               updateOn: 'blur' } ],
    url: ['', Validators.required],
    titleList: ['', Validators.required],

  });

  /*=============================================
Validación personalizada
=============================================*/
  get name(){ return this.f.controls.name; }

  // con el get image, tomamos la url de la imagen y lo mostraremos en el label

  get image() {
    return this.f.controls.image;
  }
  //
  // get titleList() {
  //   return this.f.controls.titleList;
  // }
  //
  // get icon() {
  //   return this.f.controls.icon;
  // }

/*=============================================
Variable que valida el envío del formulario
=============================================*/

  formSubmitted = false;

/*=============================================
Variable global que almacena la imagen temporal
=============================================*/
  imgTemp = '';

/*=============================================
Visualizar la url
=============================================*/

  urlInput = '';

/*=============================================
Configuración Mat Chips: Etiquetas dentro del Input Title List
=============================================*/

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  /*=============================================
Visualizar el icono
=============================================*/
  //
  iconView = '';

/*=============================================
Subir la imagen al servidor
=============================================*/

  uploadFile = '';

/*=============================================
Variable para precarga
=============================================*/

  loadData = false;

  // private imagesService: ImagesService,
  constructor(private form: FormBuilder,
              private categoriesService: CategoriesService,
              public dialogRef: MatDialogRef<NewCategoriesComponent>) { }


  ngOnInit(): void {  }


  /*=============================================
  Función Save Category
  =============================================*/

  saveCategory(): any {

    console.log(this.f);

    // this.loadData = true;

     /*=============================================
    	Validamos que el formulario haya sido enviado
    	=============================================*/

    this.formSubmitted = true;

    /*=============================================
    	Validamos que el formulario esté correcto
    	=============================================*/
    console.log('this.f', this.f);
    if (this.f.invalid) { return;  }
  }
  /*=============================================
Validamos formulario
=============================================*/
    invalidField( field: string): any {
    return functions.invalidField( field, this.f, this.formSubmitted);
  }
  /*=============================================
Validamos imagen
=============================================*/

  validateImage(e: any): any {
      functions.validateImage(e).then( (resp: any) => {
        this.imgTemp = resp;
      });
  }
  /*=============================================
Validamos  que el nombre de categoría no se repita
=============================================*/

  isRepeatCategory(): any {
    return(control: AbstractControl) => {
        const name = control.value;

        return new Promise( (resolve) => {
            this.categoriesService.getFilterData( 'name' , name ).subscribe(
              (resp: any) => {
                if ( Object.keys(resp).length > 0){
                  resolve( { category: true });
                }else {
                  resolve( { category: false });
                }
              }
            );
        });

    };
  }
}
