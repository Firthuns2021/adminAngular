import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ruta
import { UsersRoutingModule } from './users-routing.module';
// componente
import {UsersComponent} from './users.component';

// // Angular Material
// import {MatTableModule} from '@angular/material/table';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatSortModule} from '@angular/material/sort';
import {MaterialModule} from '../../../material/material.module';

// pipes
import {PipesModule} from '../../../pipes/pipes.module';
import {PagesModule} from '../../pages.module';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PipesModule,
    MaterialModule


  ]
})
export class UsersModule { }
