import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*=====================================================
 Angular Material.
 Para realizar la paginación es importante el orden de los imports
 teniendo que esta primero el paginator
========================================================*/
// users
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
// categories

import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
