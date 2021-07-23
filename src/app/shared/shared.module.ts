import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';

// rutas
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AsideComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule, RouterModule
  ]
})
export class SharedModule { }
