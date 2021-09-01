import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {functions} from 'src/app/helpers/functions';
import {CategoriesService} from 'src/app/services/categories.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialogRef} from '@angular/material/dialog';
import {MatChipInputEvent} from '@angular/material/chips';
import {Icategories} from '../../../../interface/icategories';
import {ImagesService} from '../../../../services/images.service';
import {alerts} from '../../../../helpers/alerts';

// export interface Fruit {
//   name: string;
// }

@Component({
  selector: 'app-new-categories',
  templateUrl: './new-categories.component.html',
  styleUrls: ['./new-categories.component.css']
})

export class NewCategoriesComponent implements OnInit {

  // private imagesService: ImagesService,
  constructor(private form: FormBuilder,
              private categoriesService: CategoriesService,
              public dialogRef: MatDialogRef<NewCategoriesComponent>,
              private imageServices: ImagesService) {
  }


  /*=============================================
   Creamos grupo de controles
   =============================================*/

  public f = this.form.group({

    icon: ['', Validators.required],
    image: ['', Validators.required],
    name: ['', {
      Validators: [Validators.required,
        Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚÑ ]*')],
      asyncValidators: [this.isRepeatCategory()],
      updateOn: 'blur'
    }],
    titleList: [[], [Validators.required, Validators.pattern('["\\[\\]\\-\\,\\0-9a-zA-ZáéíóúñÁÉÍÓÚÑ ]*')]]

  });

  /*=============================================
Validación personalizada
=============================================*/
  get name(): any { return this.f.controls.name; }
  // con el get image, tomamos la url de la imagen y lo mostraremos en el label
  get image(): any { return this.f.controls.image; }
  get titleList(): any { return this.f.controls.titleList; }
  get icon(): any { return this.f.controls.icon; }

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
  iconView = '';
  /*=============================================
  Subir la imagen al servidor
  =============================================*/
  uploadFile = '';
  /*=============================================
  Variable para precarga
  =============================================*/
  loadData = false;
  /*=============================================
Adiccionar chips
=============================================*/
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const input = event.input;
    console.log('value', value);
    console.log('input', input);
    // Add our fruit
    if (value) {
      this.f.controls.titleList.value.push(value.trim());
    }
    console.log('    this.f.controls.titleList.value.push(value.trim());', this.f.controls.titleList.value);
    // Clear the input value

    if (input) {
      input.value = '';
    }
    // con la siguiente funcion conseguimos realizar la validación de nuestro formulario, titleList
    // forzar la actualización de su validez
    this.f.controls.titleList.updateValueAndValidity();
  }

  remove(t: any): void {
    const index = this.f.controls.titleList.value.indexOf(t);

    if (index >= 0) {
      this.f.controls.titleList.value.splice(index, 1);
    }
    this.f.controls.titleList.updateValueAndValidity();
  }


  ngOnInit(): void {
  }


  /*=============================================
  Función Save Category
  =============================================*/

  saveCategory(): any {

    // console.log(this.f);
    this.loadData = true;
    /*=============================================
     Validamos que el formulario haya sido enviado
    =============================================*/
    this.formSubmitted = true;
    /*=============================================
    	Validamos que el formulario esté correcto
    	=============================================*/
    // console.log('this.f', this.f);
    if (this.f.invalid) {  return;  }

    /*=============================================
       Subir imagen al servidor
      =============================================*/
    this.imageServices.uploadImage(this.uploadFile, 'categories', '', 170, 170)
      .subscribe((resp: any) => {
        console.log('resp.result', resp.result);
        if (resp.status === 200) {

          /*=============================================
          Capturamos la información del formulario en la interfaz
          =============================================*/

          const dataCategory: Icategories = {

            icon: this.f.controls.icon.value.split('"')[1],
            image: resp.result,
            name: this.f.controls.name.value,
            title_list: JSON.stringify(this.f.controls.titleList.value),
            url: this.urlInput,
            view: 0,
            // state:"hidden"

          };
          console.log('dataCategory', dataCategory);
          /* *********************************************
            Guardar en base de datos la info de la categoria
            *********************************************** */
          this.categoriesService.postData(dataCategory).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
          ( resp: any) => {
              // this.loadData = false;
              console.log('resp', resp);
              alerts.basicAlert('ok', 'the category has been save', 'success');
            },
            (err: any) => {
              console.log('err', err);
              alerts.basicAlert('Error', 'Category saving error', 'error');
            }
          );
        } else {
          // this.loadData = false;
          alerts.basicAlert('error', 'invalid picture', 'error');
        }

      });
    this.loadData = false;

}

/*=============================================
Validamos formulario
=============================================*/
  invalidField(field: string): any {
    return functions.invalidField(field, this.f, this.formSubmitted);
  }

  /*=============================================
Validamos imagen
=============================================*/

  validateImage(e: any): any {
    functions.validateImage(e).then((resp: any) => {
      this.imgTemp = resp;

      this.uploadFile = e;
    });
  }

  /*=============================================
Validamos  que el nombre de categoría no se repita
=============================================*/

  isRepeatCategory(): any {
    return (control: AbstractControl) => {
      const name = functions.createUrl(control.value);

      return new Promise((resolve) => {
        this.categoriesService.getFilterData('url', name).subscribe(
          (resp: any) => {
            if (Object.keys(resp).length > 0) {
              resolve({category: true});
            } else {
              this.urlInput = name;
              // resolve( { category: false }); // borramos esta linea
            }
          }
        );
      });

    };
  }

  /*=============================================
Visualizar el icono
=============================================*/
  viewIcon(e: any): any {
    // console.log('e', e.target.value);
    this.iconView = e.target.value;

    e.target.value = this.f.controls.icon.value.split('"')[1];
  }
}
