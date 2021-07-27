import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';

// Módulos personalizados.

import {PagesModule} from './pages/pages.module';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    declarations: [
        AppComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PagesModule,
        HttpClientModule,
        BrowserAnimationsModule

    ],
    providers: [],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
