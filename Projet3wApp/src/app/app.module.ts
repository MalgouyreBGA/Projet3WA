import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
// Register the French locale data
registerLocaleData(localeFr, 'fr');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { ArticlesComponent } from './_components/articles/articles.component';
import { CustomDatePipe } from './_pipe/custom-date.pipe';
import { RegisterComponent } from './_components/register/register.component';
import { LoginCoComponent } from './_components/login-co/login-co.component';
import { LoginPageComponent } from './_components/login-page/login-page.component';
import { HomePageComponent } from './_components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ArticlesComponent,
    CustomDatePipe,
    RegisterComponent,
    LoginCoComponent,
    LoginPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' } // Set the locale to 'fr'
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
