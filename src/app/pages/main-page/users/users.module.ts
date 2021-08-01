import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ruta
import { UsersRoutingModule } from './users-routing.module';
// componente
import {UsersComponent} from './users.component';
// Material
import {MaterialModule} from '../../../material/material.module';

// pipes
import {PipesModule} from '../../../pipes/pipes.module';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PipesModule,
    MaterialModule


  ], exports: [

  ]
})
export class UsersModule { }
