import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaPdfRoutingModule } from './tabla-pdf-routing.module';
import {TablaPdfComponent} from './tabla-pdf.component';


@NgModule({
  declarations: [TablaPdfComponent],
  imports: [
    CommonModule,
    TablaPdfRoutingModule
  ]
})
export class TablaPdfModule { }
