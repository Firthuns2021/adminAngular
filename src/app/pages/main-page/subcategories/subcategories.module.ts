import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import {SubcategoriesComponent} from './subcategories.component';
import {MaterialModule} from '../../../material/material.module';
import {PipesModule} from '../../../pipes/pipes.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SubcategoriesComponent],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule,
  ]
})
export class SubcategoriesModule { }
