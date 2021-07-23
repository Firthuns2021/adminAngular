import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TablaPdfComponent} from './tabla-pdf.component';

const routes: Routes = [
  {path: '', component: TablaPdfComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablaPdfRoutingModule { }
