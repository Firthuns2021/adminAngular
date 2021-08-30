import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';

// Módulos personalizados.

import {PagesModule} from './pages/pages.module';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';

// vincular el interceptor -> ng g interceptor interceptor/int
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {IntInterceptor} from './interceptor/int.interceptor';

@NgModule({
    declarations: [
        AppComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PagesModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule


    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: IntInterceptor, multi: true   }
    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
