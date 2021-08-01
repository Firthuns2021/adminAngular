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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  exports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ]
})
export class MaterialModule { }
