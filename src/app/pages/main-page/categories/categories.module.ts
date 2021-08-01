import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import {CategoriesComponent} from './categories.component';

import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';

// pipes
import { PipesModule } from '../../../pipes/pipes.module';

// componentes para diálogos
import {EditCategoriesComponent} from './edit-categories/edit-categories.component';
import {NewCategoriesComponent} from './new-categories/new-categories.component';

@NgModule({
  declarations: [CategoriesComponent, EditCategoriesComponent, NewCategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule
  ]
})
export class CategoriesModule { }
