import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import {CategoriesComponent} from './categories.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { NewCategoriesComponent } from './new-categories/new-categories.component';


@NgModule({
  declarations: [CategoriesComponent, EditCategoriesComponent, NewCategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
