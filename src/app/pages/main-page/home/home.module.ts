import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';

// Google charts
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [ HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GoogleChartsModule
  ]
})
export class HomeModule { }
