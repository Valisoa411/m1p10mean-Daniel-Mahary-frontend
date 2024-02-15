import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { clientRoutes } from './routes/clientRoutes';

import { SignUpComponent } from './client/sign-up/sign-up.component';
import { LinksListComponent } from './util/links-list/links-list.component';
import { InscriptionloadComponent } from './client/inscriptionload/inscriptionload.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { LoginComponent } from './client/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  { path: '', component: LinksListComponent },

  ...clientRoutes
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LinksListComponent,
    InscriptionloadComponent,
    AccueilComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Ajoutez le module de routage à la liste des imports
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
